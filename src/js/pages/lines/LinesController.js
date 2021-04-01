import { COOKIE_KEY } from '../../constants/constants.js';
import { ALERT_MESSAGE, SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';
import jwtToken from '../../jwtToken.js';
import user from '../../models/user.js';
import router from '../../router.js';
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
  constructor() {
    this.linesView = new LinesView();
    this.$modifiedLine = '';
  }

  async init() {
    const allLines = await this.getAllLines();

    if (!allLines) {
      jwtToken.deleteToken(COOKIE_KEY.JWT_TOKEN);
      router.navigate(PATH.ROOT);
      return;
    }

    await this.linesView.init(allLines);
    this.bindEvents();
  }

  async getAllLines() {
    try {
      const { allLines, response } = await user.lineManager.getAllLines();

      if (!response.ok) {
        throw response;
      }

      return allLines;
    } catch (response) {
      switch (response.status) {
        case 401:
          alert(ALERT_MESSAGE.ERROR.INVALID_USER);
          break;
        default:
      }
    }
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

      this.linesView.renderModifyModal(user.lineManager.getLine(targetLineId));

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
