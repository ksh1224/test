export interface IQuiz {
  second: number;
  text: string;
}

export interface IQuizCard extends IQuiz {
  onEndAnimated?: () => void;
  onClick?: () => void;
}

export interface IResult {
  correct: boolean;
  restSecond: number;
}
