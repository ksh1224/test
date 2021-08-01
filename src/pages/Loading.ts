import { loadingStyles } from 'styles';
import { div } from 'utils';

export function Loading() {
  return div({
    options: { style: loadingStyles.container },
    children: div({
      options: {
        className: 'loader',
      },
    }),
  });
}
