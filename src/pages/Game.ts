import { GameInput, Point, Time, StartButton } from 'components';
import { SliderWords } from 'animations';
import { useEventState, useReducer, useRandomShowText } from 'hooks';
import { gameStyles } from 'styles';

import { IQuiz } from 'types';
import { colors, div, _, resetGame } from 'utils';
import { useTimer } from 'hooks/useTimer';

interface Props {
  quizList: IQuiz[];
}

export function Game(props?: Props) {
  let step = 0;
  const { quizList } = props;

  const { endGame, init, insertResult } = useReducer();

  const [getPoint, setPoint] = useEventState(quizList.length);
  const [getTime, setTime] = useEventState(0);
  const [getIsStart, setIsStart] = useEventState(false);

  const SliderWordsElement = SliderWords(quizList);
  const setShowCorrectText = useRandomShowText({ color: colors.main, text: '통과!' });
  const setShowWrongText = useRandomShowText({ color: colors.red, text: '땡!' });

  function nextLevel(result?: { correct: boolean; restSecond: number }) {
    step += 1;
    SliderWordsElement.style.left = `-${step * 100}%`;
    if (result) {
      insertResult(result);
      setTime(0);
      if (step === quizList.length + 1) return endGame();
      if (!result.correct) setPoint(getPoint().detail - 1);
    }
  }

  const { start, stop } = useTimer({
    onEnd: (diff) => {
      const isCorrect = diff > 0;
      nextLevel({
        restSecond: isCorrect ? quizList[step - 1].second - diff : 0,
        correct: isCorrect,
      });
    },
    onTime: (diff) => setTime(diff),
  });

  SliderWordsElement.addEventListener('transitionstart', (_e) => {
    start(quizList[step - 1].second);
  });

  if (window.history.state) {
    setIsStart(true);
    setTimeout(() => {
      nextLevel();
      const el = document.getElementById('gameInput');
      el?.focus();
    });
  }

  function enterHandler(e: string) {
    const text = e.trim();
    if (text.length > 0) {
      if (quizList[step - 1].text === text) {
        setShowCorrectText(true);
        setTimeout(() => setShowCorrectText(false), 200);
        stop();
      } else {
        setShowWrongText(true);
        setTimeout(() => setShowWrongText(false), 200);
      }
    }
  }

  function buttonClickHandler() {
    const { detail: isStart } = getIsStart();
    setIsStart(!isStart);
    if (!isStart) {
      nextLevel();
      const el = document.getElementById('gameInput');
      el?.focus();
    } else {
      stop();
      resetGame(init);
    }
  }

  return div({
    options: { style: gameStyles.container },
    children: [
      div({
        options: { style: { ...gameStyles.quizWrap } },
        children: [
          div({
            options: { style: gameStyles.infoWrap },
            children: [
              div({ options: { style: gameStyles.score }, children: Time(getTime()) }),
              div({
                options: { style: gameStyles.score },
                children: ['점수: ', Point(getPoint())],
              }),
            ],
          }),
          div({
            options: { style: gameStyles.quizTextWrap },
            children: SliderWordsElement,
          }),
          div({
            options: { style: gameStyles.formWrap },
            children: [
              GameInput(getIsStart(), {
                onEnter: enterHandler,
              }),
              StartButton(getIsStart(), {
                onClick: buttonClickHandler,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
