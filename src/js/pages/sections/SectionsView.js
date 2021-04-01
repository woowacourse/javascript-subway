import {
  sectionsModalTemplate,
  sectionsTemplate,
} from './templates/sectionsTemplate.js';
import { $ } from '../../utils/DOM.js';
import { sectionListTemplate } from './templates/sectionsListTemplate.js';
import user from '../../models/user.js';

class SectionsView {
  async init() {
    const { allStations } = await user.stationManager.getAllStations();
    const { allLines } = await user.lineManager.getAllLines();

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
