import { linesTemplate, modalTemplate } from './lineTemplate.js';
import { colorOptions } from '/src/js/utils/mock.js';
import { PAGE_TITLE } from '../../constants.js';
import { $ } from '../../utils/dom.js';

class Line {
  init() {}

  getPageInfo() {
    return {
      title: PAGE_TITLE.LINES,
      contents: {
        main: linesTemplate(),
        modal: modalTemplate(),
      },
    };
  }

  initDOM() {
    this.selectDOM();
  }

  // TODO(2단계) : 아래 메서드ㄷ 모듈화, 리팩토링
  selectDOM() {
    const $subwayLineColorSelector = $('.subway-line-color-selector');
    $subwayLineColorSelector.innerHTML = colorOptions
      .map(this.subwayLineColorOptionTemplate)
      .join('');
  }

  subwayLineColorOptionTemplate(color, index) {
    const hasNewLine = (index + 1) % 7 === 0;
    return `<button type="button" class="color-option bg-${color}"></button> ${
      hasNewLine ? '<br/>' : ''
    }`;
  }
}

export default Line;
