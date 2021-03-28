import { $ } from '../../utils/dom';
import store from '../../store';
import sectionsPageTemplate from './template';
import handleSelectLine from './eventHandlers/handleSelectLine';

const mountSections = () => {
  $('#route-container').innerHTML = sectionsPageTemplate(store.line.get());

  $('#line-select').addEventListener('change', handleSelectLine);
};

export default mountSections;
