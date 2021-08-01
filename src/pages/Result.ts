import { useReducer } from 'hooks';
import { resultStyles } from 'styles';
import { IResult } from 'types';
import { div, pushState, span } from 'utils';

export function Result() {
  const { init } = useReducer();
  const { resultList }: { resultList: IResult[] } = window.history.state;
  const score = resultList.reduce<number>((acc, { correct }) => (correct ? acc + 1 : acc), 0);
  const totalSecond = resultList.reduce<number>(
    (acc, { correct, restSecond }) => (correct ? acc + restSecond : acc),
    0
  );
  return div({
    options: { style: resultStyles.container },
    children: [
      div({
        options: { style: { ...resultStyles.quizWrap } },
        children: [
          div({
            options: { style: resultStyles.quizTextWrap },
            children: [
              span({ options: { style: resultStyles.title }, children: '결과는....?' }),
              span({
                options: { style: resultStyles.score },
                children: `당신의 점수는 ${score}점입니다.`,
              }),
              span({
                options: { style: resultStyles.second },
                children: `단어당 평균답변 시간은 ${(score ? totalSecond / score : 0).toFixed(
                  1
                )}초입니다.`,
              }),
            ],
          }),
          div({
            options: {
              style: resultStyles.button,
              onclick: () => {
                pushState({
                  pathName: '/',
                  callback: init,
                  state: true,
                });
              },
            },
            children: '다시 시작',
          }),
        ],
      }),
    ],
  });
}
