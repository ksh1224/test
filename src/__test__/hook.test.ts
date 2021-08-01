/* eslint-disable import/no-extraneous-dependencies */
import { useChangeElement } from 'hooks';
import { div } from 'utils';

describe('훅 테스트', () => {
  const [element, setText] = useChangeElement<string>('before', (text) => div({ children: text }));
  test('엘리먼트 변경 테스트', async () => {
    expect(element.innerHTML).toBe('before');
    setText('after');
    setTimeout(() => expect(element.innerHTML).toBe('after'), 0);
  });
});
