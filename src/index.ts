import './styles/index.scss';
import { checkIE, loadHandler, popStateHandler } from 'utils';
import { useReducer } from 'hooks';
import { createStore } from 'store';

const { endGame, init, subscribeEndGame, subscribeInitialize, subscribeInitialized } = useReducer();

loadHandler(() => {
  createStore();

  subscribeEndGame();
  subscribeInitialize();
  subscribeInitialized();

  checkIE();
  init();
});

popStateHandler({ onRootPath: init, onResultPath: endGame });
