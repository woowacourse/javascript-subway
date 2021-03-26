import { $, onModalClose } from '../../utils/DOM.js';
import colorOptions from '../../utils/colorOptions.js';
import lineColorOptionTemplate from './templates/lineColorOptionTemplate.js';
import linesTemplate from './templates/linesTemplate.js';
import {
  lineItemTemplate,
  lineListTemplate,
} from './templates/lineListTemplate.js';
import user from '../../models/user.js';

class LinesView {
  constructor() {
    this.lineManager = user.lineManager;
    this.$main = $('#main');
  }

  async init() {
    this.$main.innerHTML = await linesTemplate();
    this.renderLineColorSelector();
    $('#line-list').innerHTML = lineListTemplate(
      // TODO : 순서 역순으로 보여주기
      await this.lineManager.getAllLines()
    );
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
