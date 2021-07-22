import { ElementNode, HTMLElementOptions } from 'models';
import { input } from 'utils';

export function Input(
  options?: HTMLElementOptions & { onChangeText?: (text: string) => void },
  children?: ElementNode
) {
  const el = input(options, children);
  el.addEventListener('input', (e: InputEvent & { target: EventTarget & { value: string } }) =>
    options.onChangeText(e.target.value)
  );
  return el;
}
