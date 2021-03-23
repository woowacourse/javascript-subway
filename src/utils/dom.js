import { STYLE_CLASS } from '../constants';

const isElement = target => {
  return target.nodeType && [1, 9].includes(target.nodeType);
};

export const $ = (selector, target = document) => {
  if (typeof selector !== 'string' || !isElement(target)) return;

  const all = target.querySelectorAll(selector);
  return all.length > 1 ? [...all] : all[0];
};

export const hideElement = $element => {
  $element.classList.add(STYLE_CLASS.REMOVED);
};

export const showElement = $element => {
  $element.classList.remove(STYLE_CLASS.REMOVED);
};

export const hideElementBySelector = selector => {
  $(selector).classList.add(STYLE_CLASS.REMOVED);
};

export const showElementBySelector = selector => {
  $(selector).classList.remove(STYLE_CLASS.REMOVED);
};

export const setHeadTagAttribute = (title, styleFilePath) => {
  $('link').setAttribute('href', styleFilePath);
  $('title').textContent = title;
};

export const setTurnRedAnimation = $element => {
  $element.classList.add('turn-red');
  $element.classList.remove('cancel-red');
};

export const cancelTurnRedAnimation = $element => {
  $element.classList.remove('turn-red');
  $element.classList.add('cancel-red');
};

export const setFadeOutAnimation = $element => {
  $element.classList.add('fade-out');
};
