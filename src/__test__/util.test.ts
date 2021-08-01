/* eslint-disable import/no-extraneous-dependencies */
import { elementNode, div, h1, input, p, a, br } from 'utils';

describe('유틸 테스트', () => {
  test('엘리먼트 생성 유틸 리턴 타입 체크', () => {
    expect(
      elementNode('div', {
        children: 'sssss',
      }) instanceof HTMLElement
    ).toBe(true);
    expect(div() instanceof HTMLElement).toBe(true);
    expect(input() instanceof HTMLElement).toBe(true);
    expect(p() instanceof HTMLElement).toBe(true);
    expect(h1() instanceof HTMLElement).toBe(true);
    expect(a() instanceof HTMLElement).toBe(true);
    expect(br() instanceof HTMLElement).toBe(true);
  });

  test('엘리먼트 생성 유틸 자식 값 체크', () => {
    expect(
      elementNode('div', {
        children: 'test',
      }).innerHTML
    ).toBe('test');

    expect(
      elementNode('div', {
        children: div({
          children: 'test',
        }),
      }).innerHTML
    ).toBe('<div>test</div>');

    expect(
      elementNode('div', {
        children: [div({ children: div({ children: 'test1' }) }), a({ children: 'test2' })],
      }).innerHTML
    ).toBe('<div><div>test1</div></div><a>test2</a>');
  });
  test('엘리먼트 생성 유틸 자식 값 체크', () => {
    expect(
      elementNode('div', {
        children: 'test',
      }).innerHTML
    ).toBe('test');

    expect(
      elementNode('div', {
        children: div({
          children: 'test',
        }),
      }).innerHTML
    ).toBe('<div>test</div>');

    expect(
      elementNode('div', {
        children: [div({ children: div({ children: 'test1' }) }), a({ children: 'test2' })],
      }).innerHTML
    ).toBe('<div><div>test1</div></div><a>test2</a>');
  });
});
