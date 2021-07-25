import { GameInput, Button, SliderWords } from 'components';
import { useChangeElement } from 'hooks';
import { reducer, actions } from 'store';
import { IQuiz } from 'types';
import { colors, createStyles, div, p, _ } from 'utils';
import { push, resetGame } from 'utils/router';

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
  score: {
    alignSelf: 'center',
    display: 'inline',
    fontSize: '20px',
    top: '20%',
  },
  quizTextWrap: {
    display: 'flex',
    width: '100%',
    height: '150px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrap: {
    maxWidth: '300px',
    width: '80%',
    height: '100px',
  },
  infoWrap: {
    display: 'flex',
    maxWidth: '300px',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrongText: {
    position: 'absolute',
    color: colors.red,
    fontSize: '100px',
  },
  correctText: {
    position: 'absolute',
    color: colors.main,
    fontSize: '100px',
  },
  scoreText: { color: colors.main, position: 'absolute', left: '5px', width: '100px' },
  byeByePoint: {
    color: colors.red,
    width: '100px',
    position: 'absolute',
    opacity: 0,
    animation: '0.8s byeByePoint',
  },
});

interface Props {
  quizList: IQuiz[];
}

export function Game({ quizList }: Props) {
  let step = 0;
  let point = quizList.length;
  let diff = 0;
  let id: NodeJS.Timer;
  const SliderWordsElement = SliderWords(quizList);

  function nextLevel(result?: { correct: boolean; restSecond: number }) {
    clearInterval(id);
    if (result) {
      reducer.dispatcher(actions.insertResult(result));
    }
    if (step === quizList.length) push('/result');
    else {
      step += 1;
      SliderWordsElement.style.left = `-${step * 100}%`;
    }
  }

  const [PointElement, setPoint] = useChangeElement<number>(point, (_point) =>
    p({
      options: {
        style: { position: 'absolute' },
      },
      children: [
        _point !== point &&
          p({
            options: {
              style: styles.byeByePoint,
            },
            children: `-1 점ㅠㅠ`,
          }),
        p({
          options: { style: styles.scoreText },
          children: `${_point} 점`,
        }),
      ],
    })
  );

  const [TimeElement, setTime] = useChangeElement<number>(0, (_time) =>
    p({
      options: { style: { opacity: _time > 0 ? 1 : 0 } },
      children: [
        '시간: ',
        p({
          options: { style: { color: _time > 2 ? colors.main : colors.red } },
          children: `${_time}초`,
        }),
      ],
    })
  );

  const [correctElement, setCorrect] = useChangeElement<boolean>(false, (_isWrong) =>
    p({
      options: {
        style: {
          ...styles.correctText,
          opacity: _isWrong ? 1 : 0,
          left: `${80 * Math.random()}%`,
          top: `${80 * Math.random()}%`,
        },
      },
      children: '통과!',
    })
  );

  const [WrongElement, setWrong] = useChangeElement<boolean>(false, (_isWrong) =>
    p({
      options: {
        style: {
          ...styles.wrongText,
          opacity: _isWrong ? 1 : 0,
          left: `${80 * Math.random()}%`,
          top: `${80 * Math.random()}%`,
        },
      },
      children: '땡!',
    })
  );

  const [QuizFromElement, setStartQuiz] = useChangeElement<boolean>(false, (_isStart) =>
    div({
      children: [
        _isStart &&
          GameInput({
            id: 'gameInput',
            onEnter: (e) => {
              const text = e.trim();
              if (text.length > 0) {
                if (quizList[step - 1].text === text) {
                  setCorrect(true);
                  setTimeout(() => setCorrect(false), 200);
                  nextLevel({
                    restSecond: quizList[step - 1].second - diff / 1000,
                    correct: true,
                  });
                } else {
                  setWrong(true);
                  setTimeout(() => setWrong(false), 200);
                }
              }
            },
          }),
        div({
          options: { style: { zIndex: 1 } },
          children: Button({
            children: _isStart ? '초기화' : '시작하기',
            onClick: () => {
              clearInterval(id);
              setStartQuiz(!_isStart);
              if (!_isStart) {
                const el = document.getElementById('gameInput');
                el?.focus();
                nextLevel();
              } else resetGame();
            },
          }),
        }),
      ],
    })
  );

  function startTime() {
    clearInterval(id);
    const endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + quizList[step - 1].second);
    id = setInterval(() => {
      diff = endDate.getTime() - new Date().getTime();
      if (diff <= 0) {
        setPoint(point - 1);
        point -= 1;
        nextLevel({
          restSecond: 0,
          correct: false,
        });
        setTime(0);
        return clearInterval(id);
      }
      setTime(Math.ceil(diff / 1000));
    }, 1);
  }

  SliderWordsElement.addEventListener('transitionend', (_e) => {
    startTime();
  });

  return div({
    options: { style: styles.container, id: 'root' },
    children: [
      WrongElement,
      correctElement,
      div({
        options: { style: { ...styles.quizWrap } },
        children: [
          div({
            options: { style: styles.infoWrap },
            children: [
              div({ options: { style: styles.score }, children: TimeElement }),
              div({ options: { style: styles.score }, children: ['점수: ', PointElement] }),
            ],
          }),
          div({
            options: { style: styles.quizTextWrap },
            children: SliderWordsElement,
          }),
          div({
            options: { style: styles.formWrap },
            children: QuizFromElement,
          }),
        ],
      }),
    ],
  });
}
