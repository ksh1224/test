/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import { Game, Result } from 'pages';
import { IQuiz, IResult } from 'types';
import { _ } from 'utils';
import { actionType } from './action';

interface IState {
  quizList: IQuiz[];
  resultList: IResult[];
}

const initState: IState = {
  quizList: [],
  resultList: [],
};

export const reducer = (() => {
  let store: IState = initState;

  function dispatcher(action: { type: keyof typeof actionType; payload?: any }) {
    switch (action.type) {
      case actionType.INIT:
        store = {
          quizList: [],
          resultList: [],
        };
        // 로딩 시키기
        // root.appendChild(new HTMLDivElement());
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
        const root = document.getElementById('root');
        root.replaceWith(
          Game({
            quizList: store.quizList,
          })
        );
        root.id = 'root';
        break;
      case actionType.INSERT_RESULT:
        store = {
          ...store,
          ...(action.payload.result && { resultList: [...store.resultList, action.payload.result] }),
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
        };
        document.getElementById('root').replaceWith(
          Result({
            resultList: store.resultList,
          })
        );
        break;
    }
  }

  return {
    dispatcher,
  };
})();
