import { span, uuid } from 'utils';

interface Props {
  color: string;
  text: string;
}

interface ItemProps extends Props {
  state: boolean;
}

function getTextElement({ color, state, text }: ItemProps) {
  return span({
    options: {
      style: {
        position: 'absolute',
        color,
        fontSize: '100px',
        opacity: state ? 1 : 0,
        left: `${80 * Math.random()}%`,
        top: `${80 * Math.random()}%`,
        zIndex: state ? 1 : -1,
      },
    },
    children: text,
  });
}

export function useRandomShowText({ color, text }: Props): (nextState: boolean) => void {
  const id = uuid();
  let state = false;
  let element = getTextElement({ color, text, state });
  element.id = id;
  console.log('element', element);
  const aaa = document.getElementById('root');
  console.log('aaa', aaa);
  aaa.appendChild(element);
  function setShow(_state: boolean) {
    element = <HTMLParagraphElement>document.getElementById(id);
    console.log('element2', element);
    if (element) {
      const replaceNode = getTextElement({ color, text, state: _state });
      replaceNode.id = id;
      element.replaceWith(replaceNode);
      state = _state;
    }
  }
  return setShow;
}
