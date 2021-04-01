import SectionsView from './SectionsView.js';
import {
  $,
  changeBackgroundColor,
  onModalClose,
  onModalShow,
} from '../../utils/DOM.js';
import user from '../../models/user.js';
import { addSectionHandler, deleteSectionHandler } from './SectionHandlers.js';

class SectionsController {
  constructor() {
    this.sectionsView = new SectionsView();
  }

  async init() {
    await this.sectionsView.init();
    this.bindEvents();
  }

  onLineSelect({ target }) {
    const targetLineId = target.value;
    const targetLineColor =
      target.options[target.selectedIndex].dataset.lineColor;

    changeBackgroundColor($('#line-name'), targetLineColor);

    const sections = user.lineManager.getAllSections(targetLineId);
    this.sectionsView.renderSections(sections);
  }

  async onSectionAddBtnClick(e) {
    e.preventDefault();

    const resFlag = await addSectionHandler(e);
    const $selectedLine = e.target.elements['line-for-section'];

    if (resFlag && $('#line-name').value === $selectedLine.value) {
      const sections = user.lineManager.getAllSections($selectedLine.value);
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
