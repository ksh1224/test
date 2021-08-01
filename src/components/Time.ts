import { useChangeElement } from 'hooks';
import { colors, span } from 'utils';

export function Time(time: CustomEvent<number>) {
  const [element, setTime] = useChangeElement(time.detail, (_time) =>
    span({
      options: { style: { opacity: _time > 0 ? 1 : 0 } },
      children: [
        '시간: ',
        span({
          options: { style: { color: _time > 2 ? colors.main : colors.red } },
          children: `${_time}초`,
        }),
      ],
    })
  );
  document.addEventListener(time.type, (e: CustomEvent) => setTime(e.detail));
  return element;
}
