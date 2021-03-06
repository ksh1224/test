export type ElementArray = Array<HTMLElement | string>;
export type ElementNode = Array<ElementArray> | ElementArray | HTMLElement | string;
export type HTMLElementOptions = HTMLElement | { [key: string]: any };

export interface IElementProps {
  options?: HTMLElementOptions;
  children?: ElementNode;
}
