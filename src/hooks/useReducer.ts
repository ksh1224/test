import { Game, Loading, Result } from 'pages';
import { actions, actionType, dispatch, subscribe } from 'store';
import { IQuiz, IResult, IState } from 'types';
import { Api, pushState } from 'utils';

function loading() {
  const rootElement = document.getElementById('root');
  if (rootElement.firstChild) {
    rootElement.replaceChild(Loading(), rootElement.firstChild);
  } else rootElement.appendChild(Loading());
}

function showGame(state: IState) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.replaceChild(
      Game({
        quizList: state.quizList,
      }),
      rootElement.firstChild
    );
  }
}

function showResult(state: IState) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    if (state.resultList.length !== 0)
      pushState({
        pathName: '/result',
        state: {
          resultList: state.resultList,
        },
      });
    rootElement.replaceChild(Result(), rootElement.firstChild);
  }
}

export function useReducer() {
  const api = new Api();

  async function init() {
    await dispatch(actions.init());
    try {
      const result = await api.get<IQuiz[]>('words');
      await result.forEach((quiz) => {
        dispatch(actions.insertQuiz(quiz));
      });
      await dispatch(actions.initialized());
    } catch (error) {
      await dispatch(actions.error());
      alert(`에러발생:${error.message}`);
    }
  }

  function endGame() {
    dispatch(actions.endGame());
  }

  function insertResult(result: IResult) {
    dispatch(actions.insertResult(result));
  }

  function subscribeInitialize() {
    subscribe(actionType.INIT, loading);
  }

  function subscribeInitialized() {
    subscribe(actionType.INITIALIZED, showGame);
  }

  function subscribeEndGame() {
    subscribe(actionType.END_GAME, showResult);
  }

  return {
    init,
    endGame,
    insertResult,
    subscribeInitialize,
    subscribeInitialized,
    subscribeEndGame,
  };
}
