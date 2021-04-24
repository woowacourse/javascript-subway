import {
  sectionsModalTemplate,
  sectionsTemplate,
} from './templates/sectionsTemplate.js';
import { $ } from '../../utils/DOM.js';
import { sectionListTemplate } from './templates/sectionsListTemplate.js';

class SectionsView {
  async init(allLines, allStations) {
    $('#main').innerHTML = sectionsTemplate(allLines);
    $('#sections-modal').innerHTML = sectionsModalTemplate(
      allLines,
      allStations
    );
  }

  renderSections(sections) {
    $('#section-list').innerHTML = sectionListTemplate(sections);
  }

  deleteResult({ target }) {
    target.closest('li').remove();
  }
}

export default SectionsView;
