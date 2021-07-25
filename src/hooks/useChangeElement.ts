import { IObject } from 'types';
import { uuid } from 'utils';

export function useChangeElement<T extends string | number | boolean | IObject>(
  initState: T,
  renderElement?: (state: T) => HTMLElement
): [HTMLElement, (nextState: T) => void] {
  const id = uuid();
  let state = initState;
  let element = renderElement ? renderElement(state) : document.createElement('p');
  element.id = id;
  if (!renderElement) element.innerText = typeof state === 'object' ? '' : String(state);

  function setState(_value: T) {
    element = document.getElementById(id);
    if (element) {
      if (renderElement) {
        const replaceNode = renderElement(_value);
        replaceNode.id = id;
        element.replaceWith(replaceNode);
      } else if (element) element.innerText = String(_value);
      state = _value;
    }
  }
  return [element, setState];
}
