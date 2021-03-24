import { $ } from '../utils/dom';

export const setLineColorDot = color => {
  const $lineColorDot = $('.js-subway-line-color-dot');
  $('#subway-line-color').value = color;
  $lineColorDot.classList.remove(...$lineColorDot.classList);
  $lineColorDot.classList.add('js-subway-line-color-dot', 'subway-line-color-dot', color);
};
