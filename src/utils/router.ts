import { _ } from './common';

export function loadHandler(onLoad?: () => void) {
  window.addEventListener('load', () => {
    if (onLoad) onLoad();
  });
}

export function popStateHandler({
  onRootPath,
  onResultPath,
}: {
  onRootPath?: () => void;
  onResultPath?: () => void;
}) {
  window.onpopstate = (e) => {
    const { pathname } = window.location;
    if (pathname === '/') {
      if (e.state) window.history.replaceState(undefined, '/', window.location.origin);
      if (onRootPath) onRootPath();
    } else if (pathname === '/result') {
      if (onResultPath) onResultPath();
    }
  };
}

export function pushState({
  pathName,
  state,
  callback,
}: {
  pathName: '/' | '/result';
  state?: any;
  callback?: () => void;
}) {
  if (callback) callback();
  window.history.pushState(state, pathName, window.location.origin + pathName);
}

export function resetGame(callback: () => void) {
  if (callback) callback();
  window.history.replaceState(_, '/', window.location.origin);
}
