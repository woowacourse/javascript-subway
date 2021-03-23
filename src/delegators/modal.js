import { SELECTOR_CLASS } from '../constants.js';
import { $, openModal, closeModal } from '../utils/dom.js';

export function delegateModalClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.MODAL_OPEN_BUTTON)) {
    openModal();
  }

  if (target.closest(`.${SELECTOR_CLASS.MODAL_CLOSE}`)) {
    closeModal();
  }
}
