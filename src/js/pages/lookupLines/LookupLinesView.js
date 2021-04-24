import { $ } from '../../utils/DOM.js';
import { lookupLinesTemplate } from './templates/lookupLinesTemplate.js';
import user from '../../models/user.js';
import { lineTemplate } from './templates/lineTemplate.js';

class LookupLinesView {
  async init(allLines) {
    $('#main').innerHTML = lookupLinesTemplate(allLines);
  }

  renderSections(stations, sections, color) {
    $('#line-info').innerHTML = lineTemplate(stations, sections, color);
  }
}

export default LookupLinesView;
