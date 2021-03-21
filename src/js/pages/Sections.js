import sectionsTemplate from '../templates/sections.js';
import { $ } from '../utils/DOM.js';

class SectionsPage {
  constructor(router) {
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
  }

  renderView() {
    this.$main.innerHTML = sectionsTemplate;
  }
}

export default SectionsPage;
