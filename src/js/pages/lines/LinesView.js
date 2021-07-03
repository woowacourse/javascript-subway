import { $ } from '../../utils/DOM.js';
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

class LinesView {
  init(allLines) {
    $('#main').innerHTML = linesTemplate;
    $('#line-list').innerHTML = lineListTemplate(allLines);
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
  }

  renderModifiedLine({ id, name, color }, $modifiedLine) {
    $modifiedLine.insertAdjacentHTML(
      'beforebegin',
      lineItemTemplate({ id, name, color })
    );
    $modifiedLine.remove();
  }

  deleteResult({ target }) {
    target.closest('li').remove();
  }

  renderModal(allStations) {
    $('#lines-modal').innerHTML = linesModalTemplate(allStations);
    this.renderLineColorSelector();
  }

  renderModifyModal(targetLine) {
    $('#lines-modal').innerHTML = linesModifyingModalTemplate(targetLine);
    this.renderLineColorSelector();
  }
}

export default LinesView;
