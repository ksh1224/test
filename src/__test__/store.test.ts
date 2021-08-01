/* eslint-disable import/no-extraneous-dependencies */
import { reducer, actions } from 'store';

describe('훅 테스트', () => {
  test('게임 종료 시작 시 상태 체크', () => {
    expect(reducer.testInfo().state).toBe('GAME');
    jest.fn(reducer.dispatcher)(actions.endGame());
    expect(reducer.testInfo().state).toBe('RESULT');
  });

  test('퀴즈 데이터 바인딩 체크', () => {
    expect(reducer.testInfo().totalQuizSecond).toBe(0);
    jest.fn(reducer.dispatcher)(actions.insertQuiz({ second: 100, text: 'test1' }));
    expect(reducer.testInfo().totalQuizSecond).toBe(100);
    jest.fn(reducer.dispatcher)(actions.insertQuiz({ second: 10, text: 'test2' }));
    expect(reducer.testInfo().totalQuizSecond).toBe(110);
    jest.fn(reducer.dispatcher)(actions.insertQuiz({ second: 1, text: 'test3' }));
    expect(reducer.testInfo().totalQuizSecond).toBe(111);
    jest.fn(reducer.dispatcher)(actions.resetQuiz());
    expect(reducer.testInfo().totalQuizSecond).toBe(0);
  });

  test('결과 데이터 바인딩 체크', () => {
    expect(reducer.testInfo().correctResultListLength).toBe(0);
    jest.fn(reducer.dispatcher)(actions.insertResult({ restSecond: 100, correct: true }));
    expect(reducer.testInfo().correctResultListLength).toBe(1);
    jest.fn(reducer.dispatcher)(actions.insertResult({ restSecond: 10, correct: false }));
    expect(reducer.testInfo().correctResultListLength).toBe(1);
    jest.fn(reducer.dispatcher)(actions.insertResult({ restSecond: 1, correct: true }));
    expect(reducer.testInfo().correctResultListLength).toBe(2);
    jest.fn(reducer.dispatcher)(actions.resetResult());
    expect(reducer.testInfo().correctResultListLength).toBe(0);
  });
});
