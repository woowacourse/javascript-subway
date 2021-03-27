import { $, onModalClose } from '../../utils/DOM.js';
import colorOptions from '../../utils/colorOptions.js';
import lineColorOptionTemplate from './templates/lineColorOptionTemplate.js';
import {
  linesTemplate,
  linesModalTemplate,
  linesModifyingModalTemplate,
} from './templates/linesTemplate.js';
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
    this.$main.innerHTML = linesTemplate;
    $('#line-list').innerHTML = lineListTemplate(
      // TODO : 순서 역순으로 보여주기
      await this.lineManager.getAllLines()
    );
    $('#lines-modal').innerHTML = await linesModalTemplate();
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

  deleteResult({ target }) {
    target.closest('li').remove();
  }

  async renderModifyModal(targetLine) {
    $('#lines-modal').innerHTML = await linesModifyingModalTemplate(targetLine);
    this.renderLineColorSelector();
  }

  async renderModifiedLine({ id, name, color }, $modifiedLine) {
    $modifiedLine.insertAdjacentHTML(
      'beforebegin',
      lineItemTemplate({ id, name, color })
    );
    $modifiedLine.remove();
    // TODO: snackBar 띄우기
    onModalClose();
  }
}

export default LinesView;
