import { closeModal } from '../utils/dom.js';
import { ALERT_MESSAGE, SELECTOR_CLASS, SELECTOR_ID, STATE_KEY } from '../constants.js';
import { state } from '../store.js';
import { requestSectionRegistration } from '../api/section.js';
import { requestLineList } from '../api/line.js';

export function delegateSectionModalClickEvent(event) {
  const { target } = event;
  if (target.closest(`.${SELECTOR_CLASS.LINE_LIST_MODAL_CLOSE}`)) {
    closeModal();
  }
}

export async function delegateSectionModalSubmitEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.SUBWAY_SECTION_FORM) {
    event.preventDefault();
    await onSectionItemRegister(target);
  }
}

async function onSectionItemRegister(target) {
  const lineId = Number(target[SELECTOR_ID.SECTION_MODAL_LINE_SELECT].value);
  const upStationId = Number(target[SELECTOR_ID.SECTION_MODAL_UP_STATION_SELECT].value);
  const downStationId = Number(target[SELECTOR_ID.SECTION_MODAL_DOWN_STATION_SELECT].value);
  const distance = Number(target[SELECTOR_ID.SECTION_MODAL_DISTANCE_INPUT].value);
  const duration = Number(target[SELECTOR_ID.SECTION_MODAL_DURATION_INPUT].value);
  const targetLine = state.get(STATE_KEY.LINE_LIST).find(line => line.id === lineId); // targetLine이 이상함.
  const section = { upStationId, downStationId, distance, duration };

  if (!upStationId || !downStationId) {
    alert(ALERT_MESSAGE.NO_UP_DOWN_STATION_SELECTED);
    return;
  }

  if (upStationId === downStationId) {
    alert(ALERT_MESSAGE.UP_STATION_EQUALS_DOWN_STATION);
    return;
  }

  try {
    await requestSectionRegistration(targetLine, section);
    closeModal();
  } catch(error) {
    console.error(error);
    alert(error.message === '400' ? ALERT_MESSAGE.SECTION_MUST_INCLUDED_IN_LINE : ALERT_MESSAGE.SECTION_REGISTRATION_FAILED);
  }

  const newLineList = await requestLineList();
  state.update(STATE_KEY.LINE_LIST, newLineList);
  state.update(STATE_KEY.TARGET_SECTION_LINE_ID, lineId);
}