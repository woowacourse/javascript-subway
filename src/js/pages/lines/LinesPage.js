import linesTemplate from './linesTemplate.js';
import { $ } from '../../utils/DOM.js';

class LinesPage {
  constructor(router) {
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
  }

  renderView() {
    this.$main.innerHTML = linesTemplate;
  }
}

export default LinesPage;
