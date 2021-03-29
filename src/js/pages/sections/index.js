import { $ } from '../../utils/dom';
import { modalCloseEventInit } from '../../utils/modal';
import store from '../../store';
import sectionsPageTemplate from './template';
import handleSelectLine from './eventHandlers/handleSelectLine';
import handleSectionStatus from './eventHandlers/handleSectionStatus';

const mountSections = () => {
  $('#route-container').innerHTML = sectionsPageTemplate(store.line.get());

  $('#line-select').addEventListener('change', handleSelectLine);
  $('.js-section-list').addEventListener('click', handleSectionStatus);

  modalCloseEventInit('#section-add-modal');
  modalCloseEventInit('#section-edit-modal');
};

export default mountSections;
