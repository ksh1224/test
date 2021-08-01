import { useChangeElement } from 'hooks';
import { gameStyles } from 'styles';
import { div, input } from 'utils';

export function GameInput(
  isStart: CustomEvent<boolean>,
  { onEnter }: { onEnter: (e: string) => void }
) {
  const [element, setIsStart] = useChangeElement(isStart.detail, (_isStart) =>
    div({
      children: [
        _isStart &&
          input({
            options: {
              id: 'gameInput',
              style: gameStyles.input,
              onkeydown: (_e) => {
                const gameInput = <HTMLInputElement>document.getElementById('gameInput');
                if (_e.key === 'Enter') {
                  onEnter(gameInput.value);
                  gameInput.value = '';
                  gameInput.focus();
                  return false;
                }
                return true;
              },
            },
          }),
      ],
    })
  );

  document.addEventListener(isStart.type, (e: CustomEvent) => setIsStart(e.detail));
  return element;
}
