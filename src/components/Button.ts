import { ElementNode } from 'types';
import { colors, createStyles, div } from 'utils';

const styles = createStyles({
  button: {
    cursor: 'pointer',
    height: '50px',
    width: '150px',
    background: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    margin: 'auto',
  },
});

interface Props {
  children: ElementNode;
  onClick: () => void;
}

export function Button({ children, onClick }: Props) {
  return div({
    options: { style: styles.button, onclick: onClick },
    children,
  });
}
