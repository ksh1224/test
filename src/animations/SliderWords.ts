import { IQuiz } from 'types';
import { br, createStyles, div } from 'utils';

const styles = createStyles({
  slider: {
    position: 'absolute',
    display: 'flex',
    height: '150px',
    flexDirection: 'row',
    left: 0,
    transitionDuration: '0.5s',
    transitionProperty: 'left',
  },
  title: {
    display: 'flex',
    flex: 1,
    fontSize: '40px',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export function SliderWords(quizList: IQuiz[]) {
  return div({
    options: {
      style: { ...styles.slider, width: `${(quizList.length + 1) * 100}%` },
    },
    children: [
      div({ options: { style: styles.title }, children: ['Eeeeeeazy', br(), '타자 게임'] }),
      ...quizList.map(({ text }) => div({ options: { style: styles.title }, children: `${text}` })),
    ],
  });
}
