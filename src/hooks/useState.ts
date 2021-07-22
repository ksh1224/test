import { State } from 'observers';

export function useState<T>(initState: T) {
  const state = new State(initState);
  let element: string;

  function render(el?: HTMLElement) {
    // if (!element) element = el.outerHTML;
    // el.innerHTML = element;
    return el;
  }

  function setState(value: T) {
    console.log(value);
    state.set(value);
    render();
  }

  return {
    state: state.value,
    setState,
    render,
  };
}
