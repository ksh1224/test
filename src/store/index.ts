import { IState } from 'types';
import { actionType } from './action';
import { reducer } from './reducer';

let state: IState;

export function createStore() {
  state = reducer(undefined, { type: actionType.INIT });
}

export function dispatch(action: {
  type: typeof actionType[keyof typeof actionType];
  payload?: any;
}) {
  if (!state) return console.warn(`store is not a valid`);
  state = reducer(state, action);
  const event = new CustomEvent(action.type, { detail: state, cancelable: true, bubbles: true });
  document.dispatchEvent(event);
}

export function subscribe(
  action: typeof actionType[keyof typeof actionType],
  onChange: (e: IState) => void
) {
  document.addEventListener(action, (e: CustomEvent<IState>) => onChange(e.detail));
}

export function unsubscribe(
  action: typeof actionType[keyof typeof actionType],
  onChange: (e: IState) => void
) {
  document.removeEventListener(action, (e: CustomEvent<IState>) => onChange(e.detail));
}

export * from './action';
export * from './reducer';
