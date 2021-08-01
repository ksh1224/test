import { IQuiz, IResult } from './quiz';

export interface IState {
  quizList: IQuiz[];
  resultList: IResult[];
  state: 'GAME' | 'RESULT';
}
