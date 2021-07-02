import Cookies from 'js-cookie';

import user from '../../models/user.js';
import {
  addLineHandler,
  deleteLineHandler,
  selectColorHandler,
  modifyLineHandler,
} from './LinesHandlers.js';
import LinesView from './LinesView.js';

import router from '../../router.js';

import { $, onModalClose, onModalShow, resetInput } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';

import { COOKIE_KEY } from '../../constants/constants.js';
import { SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';

class LinesController {
  constructor() {
    this.linesView = new LinesView();
    this.$modifiedLine = '';
  }

  async init() {
    const allLines = await this.getAllLines();

    if (!allLines) return;

    this.linesView.init(allLines);
    this.bindEvents();
  }

  async getAllLines() {
    const { allLines, response } = await user.lineManager.getAllLines();

    switch (response.status) {
      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        return allLines;
    }
  }

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', async () => {
      const { allStations } = await user.stationManager.getAllStations();
      this.linesView.renderModal(allStations);
      this.bindModalEvents('#lines-form');

      onModalShow();
    });
    $('#line-list').addEventListener(
      'click',
      this.onClickLineUpdateBtn.bind(this)
    );
  }

  bindModalEvents($targetForm) {
    resetInput($($targetForm));

    $targetForm === '#lines-form'
      ? $($targetForm).addEventListener(
          'submit',
          this.onClickLineAddBtn.bind(this)
        )
      : $($targetForm).addEventListener(
          'submit',
          this.onLineSaveBtnClick.bind(this)
        );

    $('.modal-close').addEventListener('click', onModalClose);
    $('.line-color-selector').addEventListener('click', selectColorHandler);
  }

  async onClickLineAddBtn(e) {
    e.preventDefault();

    const newLine = await addLineHandler(e);
    if (newLine) {
      this.linesView.appendNewLine(newLine);

      showSnackBar(SNACKBAR_MESSAGE.SUCCESS.ADD_LINE);
      onModalClose();
    }
  }

  async onClickLineUpdateBtn(e) {
    if (!e.target.classList.contains('btn')) return;

    this.modifyLine(e);
    await this.deleteLine(e);
  }

  modifyLine(e) {
    if (e.target.classList.contains('js-modify-button')) {
      this.$modifiedLine = e.target.closest('li');
      const [targetLine] = user.lineManager.getLine(
        this.$modifiedLine.dataset.lineId
      );

      this.linesView.renderModifyModal(targetLine);
      this.bindModalEvents('#lines-modify-form');

      onModalShow();
    }
  }

  async deleteLine(e) {
    if (e.target.classList.contains('js-delete-button')) {
      const resFlag = await deleteLineHandler(e);

      if (resFlag) {
        this.linesView.deleteResult(e);

        showSnackBar(SNACKBAR_MESSAGE.SUCCESS.DELETE_LINE);
      }
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
}

export default LinesController;
