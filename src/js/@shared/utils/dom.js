export const $ = (selector, target = document) => target.querySelector(selector);

export const $$ = (selector, target = document) => target.querySelectorAll(selector);

const domParser = () => {
  const parser = new DOMParser();
  const parse = template => parser.parseFromString(template, 'text/html');

  return parse;
};

export const parseToElements = domParser();

export const show = (...elements) =>
  elements.forEach(element => {
    element.style.display = '';
  });

export const hide = (...elements) =>
  elements.forEach(element => {
    element.style.display = 'none';
  });
