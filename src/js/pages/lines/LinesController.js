import LineManager from '../../models/LineManager.js';
import { $, onModalClose, onModalShow } from '../../utils/DOM.js';
import LinesView from './LinesView.js';

class LinesController {
  constructor(router) {
    this.linesView = new LinesView();
    this.lineManager = new LineManager();
    this.router = router;
  }

  async init() {
    await this.linesView.init();
    this.bindEvents();
  }

  async addLineHandler(e) {
    e.preventDefault();

    try {
      const newLineInfo = {
        name: e.target.elements['line-name'].value,
        color: e.target.elements['line-color'].value,
        upStationId: Number(e.target.elements['up-station'].value),
        downStationId: Number(e.target.elements['down-station'].value),
        distance: Number(e.target.elements['distance'].value),
        duration: Number(e.target.elements['duration'].value),
      };
      const newLine = await this.lineManager.addLine(newLineInfo);

      this.linesView.appendNewLine(newLine);
    } catch (error) {
      console.error('fail fetch');
    }
  }

  selectColorHandler(e) {
    if (!e.target.classList.contains('color-option')) return;

    $('#line-color').value = e.target.dataset.colorOption;
  }

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', onModalShow.bind(this));
    $('.modal-close').addEventListener('click', onModalClose.bind(this));
    $('#lines-form').addEventListener('submit', this.addLineHandler.bind(this));
    $('.line-color-selector').addEventListener(
      'click',
      this.selectColorHandler
    );
  }
}

export default LinesController;
