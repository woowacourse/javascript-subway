import { closeModal } from '../utils/dom.js';
import { SELECTOR_CLASS, SELECTOR_ID, STATE_KEY } from '../constants.js';
import { state } from '../store.js';
import { requestSectionRegistration } from '../api/section.js';
import { requestLineList } from '../api/line.js';

export function delegateSectionModalClickEvent(event) {
  const { target } = event;
  if (target.closest(`.${SELECTOR_CLASS.LINE_LIST_MODAL_CLOSE}`)) {
    closeModal();
  }
}

export function delegateSectionModalSubmitEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.SUBWAY_SECTION_FORM) {
    event.preventDefault();
    onSectionItemRegister(target);
    closeModal();
  }
}

async function onSectionItemRegister(target) {
  const lineId = Number(target[SELECTOR_ID.SECTION_MODAL_LINE_SELECT].value);
  const upStationId = Number(target[SELECTOR_ID.SECTION_MODAL_UP_STATION_SELECT].value);
  const downStationId = Number(target[SELECTOR_ID.SECTION_MODAL_DOWN_STATION_SELECT].value);
  const distance = Number(target[SELECTOR_ID.SECTION_MODAL_DISTANCE_INPUT].value);
  const duration = Number(target[SELECTOR_ID.SECTION_MODAL_DURATION_INPUT].value);
  const targetLine = state.get(STATE_KEY.LINE_LIST).find(line => line.id === lineId);
  const section = { upStationId, downStationId, distance, duration };

  await requestSectionRegistration(targetLine, section);
  const newLineList = await requestLineList();
  state.update(STATE_KEY.LINE_LIST, newLineList);
  state.update(STATE_KEY.TARGET_SECTION_LINE_ID, lineId);
}