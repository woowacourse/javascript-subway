import { colorOptions } from '/src/js/utils/mock.js';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
};

const $subwayLineColorSelector = document.querySelector(
  '.subway-line-color-selector',
);

export const init = () => {
  const p = Promise.resolve(10);
  const arr = [];
  const exist = arr.includes(100);
  $subwayLineColorSelector.innerHTML = colorOptions
    .map(subwayLineColorOptionTemplate)
    .join('');
};
