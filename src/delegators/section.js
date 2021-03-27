import { SELECTOR_ID, STATE_KEY } from "../constants.js";
import { state } from '../store.js';
import { openModal } from "../utils/dom.js";

export function delegateSectionClickEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.SECTION_MODAL_OPEN) {
    onSectionModalOpen();
    openModal();
  }
}

function onSectionModalOpen() {
  state.update(STATE_KEY.TARGET_LINE_ID, -1);
}