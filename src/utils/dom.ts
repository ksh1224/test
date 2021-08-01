import { ElementNode, IElementProps, HTMLElementOptions, IObject } from 'types';

function appendText(el: HTMLElement, text: string) {
  const textNode = document.createTextNode(text);
  el.appendChild(textNode);
}

function appendChildren(el: HTMLElement, children: ElementNode) {
  if (Array.isArray(children))
    children.forEach((child: ElementNode) => {
      if (Array.isArray(child)) {
        appendChildren(el, child);
      } else if (child instanceof HTMLElement) {
        el.appendChild(child);
      } else if (typeof child === 'string') {
        appendText(el, child);
      }
    });
  else if (children instanceof HTMLElement) {
    el.appendChild(children);
  } else if (typeof children === 'string') {
    appendText(el, children);
  }
}

function setStyles(el: HTMLElement, styles: CSSStyleDeclaration) {
  if (!styles) {
    el.removeAttribute('styles');
    return;
  }

  Object.keys(styles).forEach((styleName) => {
    const { style } = el;
    if (styleName in el.style) {
      style[styleName] = styles[styleName];
    } else {
      console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
    }
  });
}

export function elementNode<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props?: IElementProps
): HTMLElementTagNameMap[K] {
  const { options, children } = props || {};
  const el = document.createElement(tagName);
  if (children)
    if (Array.isArray(children)) {
      appendChildren(el, children);
    } else if (children instanceof HTMLElement) {
      el.appendChild(children);
    } else if (typeof children === 'string') {
      appendText(el, children);
    }
  if (options)
    Object.keys(options).forEach((propName) => {
      if (propName in el) {
        const value = options[propName];
        if (propName === 'style') {
          setStyles(el, value);
        } else if (value) {
          el[propName] = value;
        }
      } else {
        console.warn(`${propName} is not a valid property of a <${options}>`);
      }
    });
  return el;
}

export function createStyles<T>(
  styles: {
    [P in keyof T]: IObject | CSSStyleDeclaration;
  }
) {
  return styles;
}

export const div = (props?: IElementProps) => elementNode('div', props);
export const h1 = (props?: IElementProps) => elementNode('h1', props);
export const h2 = (props?: IElementProps) => elementNode('h2', props);
export const h3 = (props?: IElementProps) => elementNode('h3', props);
export const h4 = (props?: IElementProps) => elementNode('h4', props);
export const a = (props?: IElementProps) => elementNode('a', props);
export const span = (props?: IElementProps) => elementNode('span', props);
export const br = (props?: IElementProps) => elementNode('br', props);
export const input = (props?: IElementProps) => elementNode('input', props);
