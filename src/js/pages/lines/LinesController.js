import { $, onModalClose, onModalShow } from '../../utils/DOM.js';
import LinesView from './LinesView.js';

class LinesController {
  constructor(router) {
    this.linesView = new LinesView();

    this.router = router;
  }

  init() {
    this.linesView.init();
    this.bindEvents();
  }

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', onModalShow.bind(this));
    $('.modal-close').addEventListener('click', onModalClose.bind(this));
  }
}

export default LinesController;
