import requestRemoveSection from './remove.js';
import { renderEditMode, renderNonEditMode } from './view.js';
import { SECTIONS_MESSAGES } from '../../../constants/index.js';

export function onClickButtonOfList({ target }) {
  if (target.classList.contains('plus-button')) {
    addSection(target);
    return;
  }

  if (target.classList.contains('remove-button')) {
    removeSection(target);
  }
}

export function onClickButtonOfForm({ target }) {
  if (target.classList.contains('check-button')) {
    approveChange();
    return;
  }

  if (target.classList.contains('undo-button')) {
    changeToNonEditMode();
  }
}

function addSection($button) {
  const { stationId } = $button.dataset;
  const offsetTop = `${$button.offsetTop}px`;

  renderEditMode(stationId, offsetTop);
}

function removeSection($button) {
  // eslint-disable-next-line no-alert
  if (!window.confirm(SECTIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE)) {
    return;
  }

  const { lineId, stationId } = $button.dataset;
  requestRemoveSection({ lineId, stationId });
}

function approveChange() {
  const $addForm = document.getElementById('add-form');
  const $stationSelect = document.getElementById('station-select');

  $addForm.dataset.downStationId = Number($stationSelect.value);

  if ($addForm.checkValidity()) {
    // eslint-disable-next-line no-new
    new FormData($addForm);
  }
}

function changeToNonEditMode() {
  renderNonEditMode();
}
