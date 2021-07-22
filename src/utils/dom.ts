import { ElementNode, ElementProps, HTMLElementOptions } from 'models';

const attributeExceptions = ['role'];

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
  props?: ElementProps
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
      if (propName in el || attributeExceptions.includes(propName)) {
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
    [P in keyof T]: { [key: string]: any } | CSSStyleDeclaration;
  }
) {
  return styles;
}

export const div = (options?: HTMLElementOptions, children?: ElementNode) => elementNode('div', { children, options });
export const h1 = (options?: HTMLElementOptions, children?: ElementNode) => elementNode('h1', { children, options });
export const h2 = (options?: HTMLElementOptions, children?: ElementNode) => elementNode('h2', { children, options });
export const h3 = (options?: HTMLElementOptions, children?: ElementNode) => elementNode('h3', { children, options });
export const h4 = (options?: HTMLElementOptions, children?: ElementNode) => elementNode('h4', { children, options });
export const a = (options?: HTMLElementOptions, children?: ElementNode) => elementNode('a', { children, options });
export const textarea = (options?: HTMLElementOptions, children?: ElementNode) =>
  elementNode('textarea', { children, options });
export const p = (options?: HTMLElementOptions, children?: ElementNode) => elementNode('p', { children, options });
export const input = (options?: HTMLElementOptions, children?: ElementNode) =>
  elementNode('input', { children, options });
