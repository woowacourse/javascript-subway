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
  async init() {
    $('#main').innerHTML = await sectionsTemplate();
    $('#sections-modal').innerHTML = await sectionsModalTemplate();
  }

  renderSections(sections) {
    $('#section-list').innerHTML = sectionListTemplate(sections);
  }

  deleteResult({ target }) {
    target.closest('li').remove();
  }
}

export default SectionsView;
