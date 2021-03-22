import { linesTemplate, modalTemplate } from './linesTemplate.js';
import { colorOptions } from '/src/js/utils/mock.js';
import { $ } from '../../utils/dom.js';

class Lines {
  init() {}

  getPageInfo() {
    return {
      title: '🚇 노선 관리',
      contents: {
        main: linesTemplate(),
        modal: modalTemplate(),
      },
    };
  }

  initDOM() {
    this.selectDOM();
  }

  // TODO : 아래 메서드 모듈화 - 2단계
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

export default Lines;
