import { SNACKBAR_MESSAGE } from '../../constants/messages.js';
import user from '../../models/user.js';
import { $, onModalClose, onModalShow, resetInput } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';
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

      showSnackBar(SNACKBAR_MESSAGE.SUCCESS.ADD_LINE);
      onModalClose();
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

      showSnackBar(SNACKBAR_MESSAGE.SUCCESS.MODIFY_LINE);
      onModalClose();
    }
  }

  async onLineUpdateBtnClick(e) {
    if (!e.target.classList.contains('btn')) return;

    if (e.target.classList.contains('js-modify-button')) {
      onModalShow();

      this.$modifiedLine = e.target.closest('li');
      const targetLineId = this.$modifiedLine.dataset.lineId;

      this.linesView.renderModifyModal(this.lineManager.getLine(targetLineId));

      this.bindModalEvents('#lines-modify-form');
    }

    if (e.target.classList.contains('js-delete-button')) {
      const resFlag = await deleteLineHandler(e);

      if (resFlag) {
        this.linesView.deleteResult(e);

        showSnackBar(SNACKBAR_MESSAGE.SUCCESS.DELETE_LINE);
      }
    }
  }

  bindModalEvents($targetForm) {
    resetInput($($targetForm), $('#line-name'));
    $targetForm === '#lines-form'
      ? $($targetForm).addEventListener(
          'submit',
          this.onLineAddBtnClick.bind(this)
        )
      : $($targetForm).addEventListener(
          'submit',
          this.onLineSaveBtnClick.bind(this)
        );

    $('.modal-close').addEventListener('click', onModalClose);
    $('.line-color-selector').addEventListener('click', selectColorHandler);
  }

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', async () => {
      onModalShow();

      await this.linesView.renderModal();
      this.bindModalEvents('#lines-form');
    });
    $('#line-list').addEventListener(
      'click',
      this.onLineUpdateBtnClick.bind(this)
    );
  }
}

export default LinesController;