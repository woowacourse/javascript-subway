import { closeModal } from '../utils/dom.js';
import { SELECTOR_CLASS } from '../constants.js';

export function delegateSectionModalClickEvent(event) {
  const { target } = event;
  if (target.closest(`.${SELECTOR_CLASS.LINE_LIST_MODAL_CLOSE}`)) {
    closeModal();
  }
}