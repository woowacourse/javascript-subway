import { $, onModalClose } from '../../utils/DOM.js';
import colorOptions from '../../utils/colorOptions.js';
import lineColorOptionTemplate from './templates/lineColorOptionTemplate.js';
import linesTemplate from './templates/linesTemplate.js';
import { lineItemTemplate } from './templates/lineListTemplate.js';

class LinesView {
  constructor() {
    this.$main = $('#main');
  }

  async init() {
    this.$main.innerHTML = await linesTemplate();
    this.renderLineColorSelector();
  }

  renderLineColorSelector() {
    $('.line-color-selector').innerHTML = colorOptions
      .map(lineColorOptionTemplate)
      .join('');
  }

  appendNewLine({ id, name, color }) {
    $('#line-list').insertAdjacentHTML(
      'beforeend',
      lineItemTemplate({ id, name, color })
    );
    // TODO: snackBar 띄우기
    onModalClose();
  }
}

export default LinesView;
