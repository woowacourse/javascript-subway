import user from '../../models/user.js';
import { $, onModalClose, onModalShow, resetInput } from '../../utils/DOM.js';
import LinesView from './LinesView.js';

class LinesController {
  constructor(router) {
    this.linesView = new LinesView();
    this.lineManager = user.lineManager;
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
      resetInput(e.target, $('#line-name'));
    } catch (error) {
      console.error('fail fetch');
    }
  }

  selectColorHandler(e) {
    if (!e.target.classList.contains('color-option')) return;

    $('#line-color').value = e.target.dataset.colorOption;
  }

  async updateLineHandler(e) {
    if (!e.target.classList.contains('btn')) return;

    if (e.target.classList.contains('js-delete-button')) {
      const targetLineId = e.target.closest('li').dataset.lineId;
      const resFlag = await this.lineManager.deleteLine(targetLineId);
      if (!resFlag) {
        alert('노선 삭제에 실패했습니다.');
        return;
      }

      this.linesView.deleteResult(e);
    }
  }

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', () => {
      onModalShow();
      resetInput($('#lines-form'), $('#line-name'));
    });
    $('.modal-close').addEventListener('click', onModalClose.bind(this));
    $('#lines-form').addEventListener('submit', this.addLineHandler.bind(this));
    $('.line-color-selector').addEventListener(
      'click',
      this.selectColorHandler
    );
    $('#line-list').addEventListener(
      'click',
      this.updateLineHandler.bind(this)
    );
  }
}

export default LinesController;
