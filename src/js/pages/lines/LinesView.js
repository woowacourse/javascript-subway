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
import user from '../../models/user.js';

class LinesView {
  async init(allLines) {
    $('#main').innerHTML = linesTemplate;
    $('#line-list').innerHTML = lineListTemplate(allLines);
    await this.renderModal();
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

  deleteResult({ target }) {
    target.closest('li').remove();
  }

  async renderModal() {
    const { allStations } = await user.stationManager.getAllStations();

    $('#lines-modal').innerHTML = linesModalTemplate(allStations);
    this.renderLineColorSelector();
  }

  renderModifyModal(targetLine) {
    $('#lines-modal').innerHTML = linesModifyingModalTemplate(targetLine);
    this.renderLineColorSelector();
  }

  renderModifiedLine({ id, name, color }, $modifiedLine) {
    $modifiedLine.insertAdjacentHTML(
      'beforebegin',
      lineItemTemplate({ id, name, color })
    );
    $modifiedLine.remove();
  }
}

export default LinesView;
