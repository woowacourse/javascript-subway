import SectionsView from './SectionsView.js';
import { $, onModalClose, onModalShow } from '../../utils/DOM.js';
import user from '../../models/user.js';
import { addSectionHandler } from './SectionHandlers.js';

class SectionsController {
  constructor(router) {
    this.sectionsView = new SectionsView();
    this.router = router;
  }

  async init() {
    await this.sectionsView.init();
    this.bindEvents();
  }

  onLineSelect(e) {
    const targetLineId = e.target.value;

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

    onModalClose();
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
  }
}

export default SectionsController;
