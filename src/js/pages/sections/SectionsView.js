import {
  sectionsModalTemplate,
  sectionsTemplate,
} from './templates/sectionsTemplate.js';
import { sectionListTemplate } from './templates/sectionsListTemplate.js';

import { $ } from '../../utils/DOM.js';

class SectionsView {
  init(allStations, allLines) {
    $('#main').innerHTML = sectionsTemplate(allLines);
    $('#sections-modal').innerHTML = sectionsModalTemplate(
      allLines,
      allStations
    );
  }

  renderSections(line) {
    $('#section-list').innerHTML = sectionListTemplate(line);
  }

  deleteResult({ target }) {
    target.closest('li').remove();
  }
}

export default SectionsView;
