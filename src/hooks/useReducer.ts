import { actions, reducer } from 'store';
import { IQuiz, IResult } from 'types';
import { Api } from 'utils';

export function useReducer() {
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

  function endGame() {
    dispatcher(actions.endGame());
  }

  function insertResult(result: IResult) {
    reducer.dispatcher(actions.insertResult(result));
  }

  return {
    init,
    endGame,
    insertResult,
  };
}
