import { addSectionHandler, deleteSectionHandler } from './SectionHandlers.js';
import SectionsView from './SectionsView.js';

import pages from '../../models/pages.js';

import {
  $,
  changeBackgroundColor,
  onModalClose,
  onModalShow,
} from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';

import { SNACKBAR_MESSAGE } from '../../constants/messages.js';

class SectionsController {
  constructor() {
    this.sectionsView = new SectionsView();
  }

  async init() {
    const { allStations } = await pages.stationManager.getAllStations();
    const { allLines } = await pages.lineManager.getAllLines();

    this.sectionsView.init(allStations, allLines);
    this.bindEvents();
  }

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', () => onModalShow());
    $('#sections-line-form').addEventListener(
      'change',
      this.onLineSelect.bind(this)
    );

    $('.modal-close').addEventListener('click', onModalClose);
    $('#sections-form').addEventListener(
      'submit',
      this.onClickSectionAddBtn.bind(this)
    );

    $('#section-list').addEventListener(
      'click',
      this.onClickSectionUpdateBtn.bind(this)
    );
  }

  async onLineSelect({ target }) {
    const lineId = target.value;
    const { lineColor } = target.options[target.selectedIndex].dataset;
    const { targetLine } = await pages.sectionManager.getSelectedSection(
      lineId
    );

    changeBackgroundColor($('#line-name'), lineColor);
    this.sectionsView.renderSections(targetLine);
  }

  async onClickSectionAddBtn(e) {
    e.preventDefault();

    const resFlag = await addSectionHandler(e);
    const selectedLine = e.target.elements['line-for-section'].value;

    if (resFlag && $('#line-name').value === selectedLine) {
      const { targetLine } = await pages.sectionManager.getSelectedSection(
        selectedLine
      );

      this.sectionsView.renderSections(targetLine);
      showSnackBar(SNACKBAR_MESSAGE.SUCCESS.ADD_SECTION);
    }

    onModalClose();
  }

  async onClickSectionUpdateBtn(e) {
    if (!e.target.classList.contains('btn')) return;

    await this.deleteStationInSection(e);
  }

  async deleteStationInSection(e) {
    if (e.target.classList.contains('js-delete-button')) {
      const resFlag = await deleteSectionHandler(e);
      if (resFlag) {
        this.sectionsView.deleteResult(e);
        showSnackBar(SNACKBAR_MESSAGE.SUCCESS.DELETE_SECTION);
      }
    }
  }
}

export default SectionsController;
