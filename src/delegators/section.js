import { SELECTOR_ID, SELECTOR_CLASS, STATE_KEY, CONFIRM_MESSAGE } from "../constants.js";
import { state } from '../store.js';
import { openModal } from "../utils/dom.js";
import { requestSectionDelete } from '../api/section.js';
import { requestLineList } from "../api/line.js";

export function delegateSectionClickEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.SECTION_MODAL_OPEN) {
    onSectionModalOpen();
    openModal();
  }

  if (target.classList.contains(SELECTOR_CLASS.SECTION_DELETE_BUTTON) && confirm(CONFIRM_MESSAGE.DELETE)) {
    onSectionItemDelete(target);
  }
}

function onSectionModalOpen() {
  state.update(STATE_KEY.TARGET_SECTION_LINE_ID, -1);
}

async function onSectionItemDelete(target) {
  const targetStationId = target.dataset.stationId;
  const targetLineId = state.get(STATE_KEY.TARGET_SECTION_LINE_ID);
  await requestSectionDelete(targetLineId, targetStationId);

  const newLineList = await requestLineList();
  state.update(STATE_KEY.LINE_LIST, newLineList);
}