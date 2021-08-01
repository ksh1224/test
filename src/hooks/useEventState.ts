import { uuid } from 'utils';

export function useEventState<T>(initState: T): [() => CustomEvent, (nextState: T) => void] {
  const id = uuid();
  let state = new CustomEvent<T>(id, { detail: initState, cancelable: true, bubbles: true });
  document.dispatchEvent(state);
  function setState(_value: T) {
    state = new CustomEvent<T>(id, {
      detail: _value,
      cancelable: true,
      bubbles: true,
    });
    document.dispatchEvent(state);
  }
  function getState() {
    return state;
  }
  return [getState, setState];
}
