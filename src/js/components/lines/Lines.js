import { colorOptions } from '/src/js/utils/mock.js';

class Lines {
  subwayLineColorOptionTemplate = (color, index) => {
    const hasNewLine = (index + 1) % 7 === 0;
    return `<button type="button" class="color-option bg-${color}"></button> ${
      hasNewLine ? '<br/>' : ''
    }`;
  };

  $subwayLineColorSelector = document.querySelector(
    '.subway-line-color-selector',
  );

  init = () => {
    $subwayLineColorSelector.innerHTML = colorOptions
      .map(subwayLineColorOptionTemplate)
      .join('');
  };
}
