import { colors, createStyles, input } from 'utils';

const styles = createStyles({
  input: {
    border: `1px solid ${colors.main}`,
    borderRadius: '5px',
    height: '40px',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '20px',
  },
});

interface Props {
  onEnter?: (e: string) => void;
  id?: string;
}

export function GameInput({ onEnter, id }: Props) {
  let text = '';
  const el = input({
    options: {
      style: styles.input,
      onkeydown: (_e) => {
        if (_e.key === 'Enter') {
          onEnter(text);
          el.value = '';
          el.focus();
          return false;
        }
        return true;
      },
      id,
    },
  });
  el.addEventListener('input', (_e: InputEvent & { target: EventTarget & { value: string } }) => {
    text = _e.target.value;
    return _e;
  });
  return el;
}
