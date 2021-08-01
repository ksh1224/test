/* eslint-disable import/no-extraneous-dependencies */
import { GameInput } from 'components';
import { mocked } from 'ts-jest/utils';

describe('커스텀 컴포넌트 테스트', () => {
  test('인풋 엘리먼트 리턴 체크', () => {
    const el = mocked(
      GameInput({
        onEnter: jest.fn((e) => {
          expect(e).toBe('test1');
        }),
      })
    );
    expect(el instanceof HTMLInputElement).toBe(true);
  });
});
