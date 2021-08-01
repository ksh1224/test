import { IQuiz, IResult } from 'types';

const INIT = 'INIT' as const;
const INSERT_QUIZ = 'INSERT_QUIZ' as const;
const RESET_QUIZ = 'RESET_QUIZ' as const;
const INITIALIZED = 'INITIALIZED' as const;
const INSERT_RESULT = 'INSERT_RESULT' as const;
const RESET_RESULT = 'RESET_RESULT' as const;
const END_GAME = 'END_GAME' as const;
const ERROR = 'ERROR' as const;

export const actionType = {
  INIT,
  INSERT_QUIZ,
  RESET_QUIZ,
  INITIALIZED,
  INSERT_RESULT,
  RESET_RESULT,
  END_GAME,
  ERROR,
};

const init = () => ({
  type: INIT,
});

const insertQuiz = (quiz: IQuiz) => ({
  type: INSERT_QUIZ,
  payload: { quiz },
});

const initialized = () => ({
  type: INITIALIZED,
});

const insertResult = (result: IResult) => ({
  type: INSERT_RESULT,
  payload: { result },
});

const resetQuiz = () => ({
  type: RESET_QUIZ,
});

const resetResult = () => ({
  type: RESET_RESULT,
});

const endGame = () => ({
  type: END_GAME,
});

const error = () => ({
  type: ERROR,
});

export const actions = {
  init,
  insertQuiz,
  initialized,
  insertResult,
  resetQuiz,
  resetResult,
  endGame,
  error,
};
