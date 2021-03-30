export const $ = (selector, target = document) => target.querySelector(selector);

export const $$ = (selector, target = document) => target.querySelectorAll(selector);

export const parseToElements = template => new DOMParser().parseFromString(template, 'text/html');

export const show = (...elements) =>
  elements.forEach(element => {
    element.style.display = '';
  });

export const hide = (...elements) =>
  elements.forEach(element => {
    element.style.display = 'none';
  });
