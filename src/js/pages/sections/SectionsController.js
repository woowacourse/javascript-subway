import SectionsView from './SectionsView.js';
import { $, onModalClose, onModalShow } from '../../utils/DOM.js';
import user from '../../models/user.js';

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

  bindEvents() {
    $('.modal-trigger-btn').addEventListener('click', () => onModalShow());
    $('.modal-close').addEventListener('click', onModalClose);
    $('#sections-form').addEventListener(
      'change',
      this.onLineSelect.bind(this)
    );
  }
}

export default SectionsController;
