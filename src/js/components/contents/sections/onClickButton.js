import requestRemoveSection from './remove.js';
import { renderEditMode, renderNonEditMode } from './view.js';
import { SECTIONS_MESSAGES } from '../../../constants/index.js';

export function onClickButtonOfList({ target }) {
  if (target.classList.contains('plus-button')) {
    onClickPlusButton(target);
    return;
  }

  if (target.classList.contains('remove-button')) {
    onClickRemoveButton(target);
  }
}

export function onClickButtonOfForm({ target }) {
  if (target.classList.contains('check-button')) {
    onClickCheckButton();
    return;
  }

  if (target.classList.contains('undo-button')) {
    onClickUndoButton();
  }
}

function onClickPlusButton($plusButton) {
  const { stationId } = $plusButton.dataset;
  const offsetTop = `${$plusButton.offsetTop}px`;

  renderEditMode(stationId, offsetTop);
}

function onClickRemoveButton($removeButton) {
  // eslint-disable-next-line no-alert
  if (!window.confirm(SECTIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE)) {
    return;
  }

  const { lineId, stationId } = $removeButton.dataset;
  requestRemoveSection({ lineId, stationId });
}

function onClickCheckButton() {
  const $addForm = document.getElementById('add-form');
  const $stationSelect = document.getElementById('station-select');

  $addForm.dataset.downStationId = Number($stationSelect.value);

  if ($addForm.checkValidity()) {
    // eslint-disable-next-line no-new
    new FormData($addForm);
  }
}

function onClickUndoButton() {
  renderNonEditMode();
}
