import { useChangeElement } from 'hooks';
import { gameStyles } from 'styles';
import { div } from 'utils';

export function StartButton(
  isStart: CustomEvent<boolean>,
  { onClick }: { onClick: (e: MouseEvent) => void }
) {
  const [element, setIsStart] = useChangeElement(isStart.detail, (_isStart) =>
    div({
      options: { style: gameStyles.button, onclick: onClick },
      children: _isStart ? '초기화' : '시작하기',
    })
  );
  document.addEventListener(isStart.type, (e: CustomEvent) => setIsStart(e.detail));
  return element;
}
