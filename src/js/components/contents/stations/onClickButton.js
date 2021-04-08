import { renderNonEditMode, renderEditMode } from './view.js';
import requestRemoveStation from './remove.js';
import { STATIONS_MESSAGES } from '../../../constants/index.js';

export default function onClickButton({ target }) {
  if (target.classList.contains('edit-button')) {
    changeToEditMode(target);
    return;
  }

  if (target.classList.contains('check-button')) {
    approveChange(target);
    return;
  }

  if (target.classList.contains('remove-button')) {
    removeStation(target);
    return;
  }

  if (target.classList.contains('undo-button')) {
    changeToNonEditMode(target);
  }
}

function changeToEditMode($button) {
  const $editForm = $button.closest('.edit-form');
  renderEditMode($editForm);
}

function changeToNonEditMode($button) {
  const $editForm = $button.closest('.edit-form');

  renderNonEditMode($editForm);
}

function approveChange($button) {
  const $editForm = $button.closest('.edit-form');

  if ($editForm.reportValidity()) {
    // eslint-disable-next-line no-new
    new FormData($editForm);
  }
}

function removeStation($button) {
  // eslint-disable-next-line no-alert
  if (!window.confirm(STATIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE)) {
    return;
  }

  const $editForm = $button.closest('.edit-form');
  requestRemoveStation($editForm);
}
