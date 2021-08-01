import { useChangeElement } from 'hooks';
import { gameStyles } from 'styles';
import { span } from 'utils';

export function Point(point: CustomEvent<number>) {
  const [element, setPoint] = useChangeElement(point.detail, (_point) =>
    span({
      options: {
        style: { position: 'absolute' },
      },
      children: [
        _point !== point.detail &&
          span({
            options: {
              style: gameStyles.byeByePoint,
            },
            children: `-1 점ㅠㅠ`,
          }),
        span({
          options: { style: gameStyles.scoreText },
          children: `${_point} 점`,
        }),
      ],
    })
  );
  document.addEventListener(point.type, (e: CustomEvent) => setPoint(e.detail));
  return element;
}
