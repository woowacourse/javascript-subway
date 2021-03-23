import { ALERT_MESSAGE, SELECTOR_CLASS, SELECTOR_ID, STATE_KEY, STYLE_CLASS } from '../constants';
import { state } from '../store.js';
import { isDuplicatedStationNameExist, isProperStationNameLength } from '../validators/station.js';
import { requestStationRegistration } from '../api/station.js';
import { $, showElement } from '../utils/dom.js';

export function delegateStationSubmitEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.STATION_FORM) {
    onStationFormSubmit(target);
  }
}

export function delegateStationClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_EDIT)) {
    onStationItemInputOpen(target);
  }
}

export function delegateStationFocusOutEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_INPUT)) {
    onStationItemEdit(target);
  }
}

function onStationFormSubmit(target) {
  const { stationName: stationNameInput } = target;
  const stationList = state.get(STATE_KEY.STATION_LIST);
  if (!isProperStationNameLength(stationNameInput.value)) {
    alert(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
    return;
  }
  if (isDuplicatedStationNameExist(stationNameInput.value, stationList)) {
    alert(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
    return;
  }
  requestStationRegistration(stationNameInput.value)
    .then(({ id, name }) => {
      state.update(STATE_KEY.STATION_LIST, [...stationList, { id, name }]);
    })
    .catch(error => {
      console.log(error);
      alert(ALERT_MESSAGE.STATION_REGISTRATION_FAILED);
    });
}

function onStationItemInputOpen(target) {
  const { stationId, stationName } = target.dataset;
  const $stationInput = $(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}[data-station-id="${stationId}"]`);
  $stationInput.value = stationName;
  showElement($stationInput);
  $stationInput.focus();
}

// TODO : 후에 역 이름 수정 API 삽입
function onStationItemEdit(target) {
  const { stationId } = target.dataset;
  const stationList = state.get(STATE_KEY.STATION_LIST);
  const newStationName = target.value;
  const targetStationItem = stationList.find(station => station.id === Number(stationId));
  targetStationItem.name = newStationName;
  state.update(STATE_KEY.STATION_LIST, stationList);
}
