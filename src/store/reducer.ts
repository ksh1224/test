/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import { Game, Loading, Result } from 'pages';
import { IQuiz, IResult } from 'types';
import { pushState, _ } from 'utils';
import { actionType } from './action';

interface IState {
  quizList: IQuiz[];
  resultList: IResult[];
  state: 'GAME' | 'RESULT';
}

const initState: IState = {
  quizList: [],
  resultList: [],
  state: 'GAME',
};

export const reducer = (() => {
  let store: IState = initState;
  let rootElement: HTMLElement;

  function dispatcher(action: { type: keyof typeof actionType; payload?: any }) {
    switch (action.type) {
      case actionType.INIT:
        store = {
          quizList: [],
          resultList: [],
          state: 'GAME',
        };
        rootElement = document.getElementById('root');
        if (rootElement.firstChild) {
          rootElement.replaceChild(Loading(), rootElement.firstChild);
        } else rootElement.appendChild(Loading());
        break;
      case actionType.INSERT_QUIZ:
        store = {
          ...store,
          ...(action.payload.quiz && { quizList: [...store.quizList, action.payload.quiz] }),
        };
        break;
      case actionType.RESET_QUIZ:
        store = {
          ...store,
          quizList: [],
        };
        break;
      case actionType.INITIALIZED:
        store = {
          ...store,
        };
        rootElement = document.getElementById('root');
        if (rootElement) {
          rootElement.replaceChild(
            Game({
              quizList: store.quizList,
            }),
            rootElement.firstChild
          );
        }

        break;
      case actionType.INSERT_RESULT:
        store = {
          ...store,
          ...(action.payload.result && {
            resultList: [...store.resultList, action.payload.result],
          }),
        };
        break;
      case actionType.RESET_RESULT:
        store = {
          ...store,
          resultList: [],
        };
        break;
      case actionType.END_GAME:
        store = {
          ...store,
          state: 'RESULT',
        };
        rootElement = document.getElementById('root');
        if (rootElement) {
          if (store.resultList.length !== 0)
            pushState({
              pathName: '/result',
              state: {
                resultList: store.resultList,
              },
            });
          rootElement.replaceChild(Result(), rootElement.firstChild);
        }
        break;
    }
  }

  function testInfo() {
    const totalQuizSecond = store.quizList.reduce<number>((acc, { second }) => acc + second, 0);
    const correctResultListLength = store.resultList.filter(({ correct }) => correct).length;
    return {
      totalQuizSecond,
      correctResultListLength,
      state: store.state,
    };
  }

  return {
    dispatcher,
    testInfo,
  };
})();
