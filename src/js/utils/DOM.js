export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const show = ($element) => $element.classList.remove('v-hidden');
export const hide = ($element) => $element.classList.add('v-hidden');
