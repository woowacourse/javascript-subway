import { $ } from '../../utils/DOM.js';
import colorOptions from '../../utils/colorOptions.js';
import lineColorOptionTemplate from './templates/lineColorOptionTemplate.js';
import linesTemplate from './templates/linesTemplate.js';

class LinesView {
  constructor() {
    this.$main = $('#main');
  }

  init() {
    this.$main.innerHTML = linesTemplate;
    this.renderLineColorSelector();
  }

  renderLineColorSelector() {
    $('.subway-line-color-selector').innerHTML = colorOptions
      .map(lineColorOptionTemplate)
      .join('');
  }
}

export default LinesView;
