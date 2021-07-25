import { Game, Result } from 'pages';
import { actions, reducer } from 'store';
import { IQuiz } from 'types';
import { Api } from './api';
import { _ } from './common';

const router = {
  '/': Game,
  '/result': Result,
};

const { dispatcher } = reducer;

const api = new Api();

async function init() {
  await dispatcher(actions.init());
  const result = await api.get<IQuiz[]>('words');
  await result.forEach((quiz) => {
    dispatcher(actions.insertQuiz(quiz));
  });
  await dispatcher(actions.initialized());
}

export function loadHandler() {
  window.addEventListener('load', () => {
    init();
  });
}

export function popStateHandler() {
  window.onpopstate = (e) => {
    const { pathname } = window.location;
    if (pathname === '/') {
      init();
    } else if (pathname === '/result') {
      dispatcher(actions.endGame());
    }
  };
}

export function push(pathName: keyof typeof router, state?: any) {
  if (pathName === '/') init();
  else if (pathName === '/result') dispatcher(actions.endGame());
  window.history.pushState(state, pathName, window.location.origin + pathName);
}
export function resetGame() {
  init();
  window.history.replaceState(_, '/', window.location.origin);
}
