export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => [...document.querySelectorAll(selector)];

export const activateTarget = ($target) => {
  $target.removeAttribute('disabled');
};

export const deactivateTarget = ($target) => {
  $target.setAttribute('disabled', '');
};
