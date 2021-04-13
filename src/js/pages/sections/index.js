import { $ } from '../../utils/dom';
import { modalCloseEventInit } from '../../utils/modal';
import store from '../../store';
import sectionsPageTemplate from './template';
import handleSelectLine from './eventHandlers/handleSelectLine';
import handleSectionStatus from './eventHandlers/handleSectionStatus';
import handleAddSection from './eventHandlers/handleAddSection';

const mountSections = () => {
  $('#route-container').innerHTML = sectionsPageTemplate(store.line.get());

  $('#line-select').addEventListener('change', handleSelectLine);
  $('.js-section-list').addEventListener('click', handleSectionStatus);
  $('#section-add-form').addEventListener('submit', handleAddSection);

  modalCloseEventInit('#section-add-modal');
};

export default mountSections;
