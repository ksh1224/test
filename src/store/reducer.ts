/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import { IState } from 'types';

import { _ } from 'utils';
import { actionType } from './action';

const initialState: IState = {
  quizList: [],
  resultList: [],
  state: 'GAME',
};

export function reducer(
  state = initialState,
  action: {
    type: any;
    payload?: any;
  }
): IState {
  console.log('action', action);
  switch (action.type) {
    case actionType.INIT:
      return {
        quizList: [],
        resultList: [],
        state: 'GAME',
      };
    case actionType.INSERT_QUIZ:
      return {
        ...state,
        ...(action.payload.quiz && { quizList: [...state.quizList, action.payload.quiz] }),
      };
    case actionType.RESET_QUIZ:
      return {
        ...state,
        quizList: [],
      };
    case actionType.INITIALIZED:
      return {
        ...state,
      };
    case actionType.INSERT_RESULT:
      return {
        ...state,
        ...(action.payload.result && {
          resultList: [...state.resultList, action.payload.result],
        }),
      };
    case actionType.RESET_RESULT:
      return {
        ...state,
        resultList: [],
      };
    case actionType.END_GAME:
      return {
        ...state,
        state: 'RESULT',
      };
    case actionType.ERROR:
      return {
        quizList: [],
        resultList: [],
        state: 'GAME',
      };
  }
}
