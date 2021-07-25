import { Button } from 'components';
import { reducer } from 'store';
import { IResult } from 'types';
import { createStyles, div, p } from 'utils';
import { push, resetGame } from 'utils/router';

interface Props {
  resultList: IResult[];
}

const styles = createStyles({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizWrap: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizTextWrap: {
    display: 'flex',
    width: '100%',
    height: '150px',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  title: {
    display: 'flex',
    flex: 1,
    fontSize: '25px',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  score: {
    display: 'flex',
    flex: 1,
    fontSize: '35px',
    padding: '20px 0',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  second: {
    display: 'flex',
    flex: 1,
    fontSize: '20px',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export function Result({ resultList }: Props) {
  const score = resultList.reduce<number>((acc, { correct }) => (correct ? acc + 1 : acc), 0);
  const totalSecond = resultList.reduce<number>(
    (acc, { correct, restSecond }) => (correct ? acc + restSecond : acc),
    0
  );
  return div({
    options: { style: styles.container, id: 'root' },
    children: [
      div({
        options: { style: { ...styles.quizWrap } },
        children: [
          div({
            options: { style: styles.quizTextWrap },
            children: [
              p({ options: { style: styles.title }, children: '결과는....?' }),
              p({ options: { style: styles.score }, children: `당신의 점수는 ${score}점입니다.` }),
              p({
                options: { style: styles.second },
                children: `단어당 평균답변 시간은 ${(score ? totalSecond / score : 0).toFixed(1)}초입니다.`,
              }),
            ],
          }),

          Button({
            children: '다시 시작',
            onClick: () => {
              push('/');
            },
          }),
        ],
      }),
    ],
  });
}
