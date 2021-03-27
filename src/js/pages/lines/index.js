import { $ } from '../../utils/dom';
import { modalCloseEventInit } from '../../utils/modal';
import store from '../../store';
import linesPageTemplate from './template';
import handleAddLine from './eventHandlers/handleAddLine';
import handleEditLine from './eventHandlers/handleEditLine';
import handleLineStatus from './eventHandlers/handleLineStatus';
import handleOpenLineAddModal from './eventHandlers/handleOpenLineAddModal';
import handleSelectColor from './eventHandlers/handleSelectColor';
import handleSelectUpStation from './eventHandlers/handleSelectUpStation';

const bindEvents = () => {
  $('#create-line-button').addEventListener('mousedown', handleOpenLineAddModal);
  $('#line-add-form').addEventListener('submit', handleAddLine);
  $('#line-edit-form').addEventListener('submit', handleEditLine);
  $('#line-add-form .subway-line-color-selector').addEventListener('click', handleSelectColor);
  $('#line-edit-form .subway-line-color-selector').addEventListener('click', handleSelectColor);
  $('#line-add-form #up-station').addEventListener('change', handleSelectUpStation);
  $('.js-line-list').addEventListener('click', handleLineStatus);

  modalCloseEventInit('#line-add-modal');
  modalCloseEventInit('#line-edit-modal');
};

const mountLines = () => {
  $('#route-container').innerHTML = linesPageTemplate(store.line.get());

  bindEvents();
};

export default mountLines;
