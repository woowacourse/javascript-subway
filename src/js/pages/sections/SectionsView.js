import {
  sectionsModalTemplate,
  sectionsTemplate,
} from './templates/sectionsTemplate.js';
import { $ } from '../../utils/DOM.js';
import {
  sectionItemTemplate,
  sectionListTemplate,
} from './templates/sectionsListTemplate.js';

class SectionsView {
  constructor() {
    this.$main = $('#main');
  }

  async init() {
    this.$main.innerHTML = await sectionsTemplate();
    $('#sections-modal').innerHTML = await sectionsModalTemplate();
  }

  renderSections(sections) {
    $('#section-list').innerHTML = sectionListTemplate(sections);
  }
}

export default SectionsView;
