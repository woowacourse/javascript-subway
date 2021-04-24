import SectionsView from './SectionsView.js';
import {
  $,
  changeBackgroundColor,
  onModalClose,
  onModalShow,
} from '../../utils/DOM.js';
import user from '../../models/user.js';
import { addSectionHandler, deleteSectionHandler } from './SectionHandlers.js';
import { ALERT_MESSAGE } from '../../constants/messages.js';
import jwtToken from '../../jwtToken.js';
import router from '../../router.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import { PATH } from '../../constants/path.js';

class SectionsController {
  constructor() {
    this.sectionsView = new SectionsView();
  }

  async init() {
    const allLines = await this.getAllLines();

    const { allStations } = await user.stationManager.getAllStations();

    if (!allLines || !allStations) {
      jwtToken.deleteToken(COOKIE_KEY.JWT_TOKEN);
      router.navigate(PATH.ROOT);
      return;
    }

    await this.sectionsView.init(allLines, allStations);
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

  onLineSelect({ target }) {
    const targetLineId = target.value;
    const targetLineColor =
      target.options[target.selectedIndex].dataset.lineColor;

    changeBackgroundColor($('#line-name'), targetLineColor);

    const sections = user.lineManager.getAllStationsInLine(targetLineId);
    this.sectionsView.renderSections(sections);
  }

  async onSectionAddBtnClick(e) {
    e.preventDefault();

    const resFlag = await addSectionHandler(e);
    const $selectedLine = e.target.elements['line-for-section'];

    if (resFlag && $('#line-name').value === $selectedLine.value) {
      const sections = user.lineManager.getAllStationsInLine(
        $selectedLine.value
      );
      this.sectionsView.renderSections(sections);
    }

    $('#sections-form').reset();
    onModalClose();
  }

  async onSectionUpdateBtnClick(e) {
    if (!e.target.classList.contains('btn')) return;

    if (e.target.classList.contains('js-delete-button')) {
      const resFlag = await deleteSectionHandler(e);
      if (resFlag) {
        this.sectionsView.deleteResult(e);
      }
    }
  }

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', () => onModalShow());
    $('.modal-close').addEventListener('click', onModalClose);
    $('#sections-line-form').addEventListener(
      'change',
      this.onLineSelect.bind(this)
    );
    $('#sections-form').addEventListener(
      'submit',
      this.onSectionAddBtnClick.bind(this)
    );
    $('#section-list').addEventListener(
      'click',
      this.onSectionUpdateBtnClick.bind(this)
    );
  }
}

export default SectionsController;
