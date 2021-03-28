import user from '../../models/user.js';
import { $, onModalClose, onModalShow, resetInput } from '../../utils/DOM.js';
import {
  addLineHandler,
  deleteLineHandler,
  selectColorHandler,
  modifyLineHandler,
} from './LinesHandlers.js';
import LinesView from './LinesView.js';

class LinesController {
  constructor(router) {
    this.linesView = new LinesView();
    this.lineManager = user.lineManager;
    this.router = router;

    this.$modifiedLine = '';
  }

  async init() {
    await this.linesView.init();
    this.bindEvents();
  }

  async onLineAddBtnClick(e) {
    e.preventDefault();

    const newLine = await addLineHandler(e);
    if (newLine) {
      this.linesView.appendNewLine(newLine);
      resetInput(e.target, $('#line-name'));
    }
  }

  async onLineSaveBtnClick(e) {
    e.preventDefault();

    const modifiedLine = await modifyLineHandler(
      e,
      this.$modifiedLine.dataset.lineId
    );

    if (modifiedLine) {
      this.linesView.renderModifiedLine(modifiedLine, this.$modifiedLine);
      resetInput(e.target, $('#line-name'));
    }
  }

  async onLineUpdateBtnClick(e) {
    if (!e.target.classList.contains('btn')) return;

    if (e.target.classList.contains('js-modify-button')) {
      onModalShow();

      this.$modifiedLine = e.target.closest('li');
      const targetLineId = this.$modifiedLine.dataset.lineId;

      await this.linesView.renderModifyModal(
        this.lineManager.getLine(targetLineId)
      );

      this.bindModifyModalEvents();
    }

    if (e.target.classList.contains('js-delete-button')) {
      const resFlag = await deleteLineHandler(e);
      if (resFlag) {
        this.linesView.deleteResult(e);
      }
    }
  }

  bindModifyModalEvents() {
    $('#lines-modify-form').addEventListener(
      'submit',
      this.onLineSaveBtnClick.bind(this)
    );
    $('.modal-close').addEventListener('click', onModalClose);
    $('.line-color-selector').addEventListener('click', selectColorHandler);
  }

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', () => {
      onModalShow();
      resetInput($('#lines-form'), $('#line-name'));
    });
    $('.modal-close').addEventListener('click', onModalClose);
    $('#lines-form').addEventListener(
      'submit',
      this.onLineAddBtnClick.bind(this)
    );

    $('.line-color-selector').addEventListener('click', selectColorHandler);
    $('#line-list').addEventListener(
      'click',
      this.onLineUpdateBtnClick.bind(this)
    );
  }
}

export default LinesController;
