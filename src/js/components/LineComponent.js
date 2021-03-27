import { ID_SELECTOR } from '../constants.js';
import LINE_TEMPLATE from '../templates/lineTemplate.js';
import { openModal } from '../utils/DOM.js';
import $ from '../utils/querySelector.js';
import Component from './Component.js';

class LineComponent extends Component {
  constructor() {
    super();
  }

  initEvent() {
    $(`#${ID_SELECTOR.LINE_CREATION_BUTTON}`).addEventListener(
      'click',
      openModal
    );
  }

  render() {
    super.render(LINE_TEMPLATE);
  }
}

export default LineComponent;
