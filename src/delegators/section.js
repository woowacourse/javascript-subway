import { SELECTOR_ID, SELECTOR_CLASS, STATE_KEY, CONFIRM_MESSAGE, ALERT_MESSAGE } from '../constants.js';
import { state } from '../store.js';
import { openModal } from '../utils/dom.js';
import { requestSectionDelete } from '../api/section.js';
import { requestLineList } from '../api/line.js';

export function delegateSectionClickEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.SECTION_MODAL_OPEN) {
    openModal();
    return;
  }

  if (target.classList.contains(SELECTOR_CLASS.SECTION_DELETE_BUTTON)) {
    confirm(CONFIRM_MESSAGE.DELETE) && onSectionItemDelete(target);
    return;
  }
}

async function onSectionItemDelete(target) {
  const targetStationId = target.dataset.stationId;
  const targetLineId = state.get(STATE_KEY.TARGET_SECTION_LINE_ID);
  try {
    await requestSectionDelete(targetLineId, targetStationId);
    const newLineList = await requestLineList();
    state.update(STATE_KEY.LINE_LIST, newLineList);
  } catch (error) {
    alert(ALERT_MESSAGE.SECTION_DELETE_FAILED);
    console.log(error);
  }
}
