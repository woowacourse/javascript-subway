import { ALERT_MESSAGE, SELECTOR_CLASS, SELECTOR_ID, STATE_KEY, CONFIRM_MESSAGE, SELECTOR_NAME } from '../constants';
import { state } from '../store.js';
import { isDuplicatedStationExist, isProperStationNameLength } from '../validators/station.js';
import { requestStationDelete, requestStationRegistration, requestStationUpdate } from '../api/station.js';
import { $, setTurnRedAnimation, setFadeOutAnimation, showElement, cancelTurnRedAnimation } from '../utils/dom.js';
import { wait } from '../utils/utils';

export function delegateStationSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.id === SELECTOR_ID.STATION_FORM) {
    onStationFormSubmit(target);
  }
}

// TODO : 노선 포함 여부에 따라 역 삭제 처리

export function delegateStationClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE)) {
    onStationItemInputOpen(target);
  }
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_DELETE)) {
    if (!confirm(CONFIRM_MESSAGE.DELETE)) return;
    onStationItemDeleteClick(target);
  }
}

export function delegateStationFocusOutEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_INPUT)) {
    onStationItemInputFocusOut(target);
  }
}

function onStationFormSubmit(target) {
  const { [SELECTOR_NAME.STATION_NAME]: stationNameInput } = target;
  const targetStationName = stationNameInput.value
  const stationList = state.get(STATE_KEY.STATION_LIST);
  if (!isProperStationNameLength(targetStationName)) {
    alert(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
    return;
  }
  if (isDuplicatedStationExist({name: targetStationName}, stationList)) {
    alert(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
    return;
  }
  requestStationRegistration(targetStationName)
    .then(({ id, name }) => {
      state.update(STATE_KEY.STATION_LIST, [...stationList, { id, name }]);
    })
    .catch(error => {
      console.log(error);
      alert(ALERT_MESSAGE.STATION_REGISTRATION_FAILED);
    }).finally(() => {
      stationNameInput.value = '';
    });
}

function onStationItemInputOpen(target) {
  const { stationId, stationName } = target.dataset;
  const $stationInput = $(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}[data-station-id="${stationId}"]`);
  $stationInput.value = stationName;
  showElement($stationInput);
  $stationInput.focus();
}

function onStationItemInputFocusOut(targetInput) {
  const newStationName = targetInput.value;
  const targetStationId = Number(targetInput.dataset.stationId);
  const stationList = state.get(STATE_KEY.STATION_LIST);
  const targetStationItem = stationList.find(station => station.id === targetStationId);
  if (targetStationItem.name === newStationName) {
    state.update(STATE_KEY.STATION_LIST, stationList);
    return;
  }
  if (!isProperStationNameLength(newStationName)) {
    alert(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
    return;
  }
  if (isDuplicatedStationExist({id: targetStationId, name: newStationName}, stationList)) {
    alert(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
    return;
  }
  targetStationItem.name = newStationName;
  requestStationUpdate(targetStationId, newStationName).then(() => {
    state.update(STATE_KEY.STATION_LIST, stationList);
  }).catch(error => {
    console.log(error);
    alert(ALERT_MESSAGE.STATION_UPDATE_FAILED)
  })
}

function onStationItemDeleteClick(target) {
  const stationId = Number(target.dataset.stationId);
  if (isStationExistInLine(stationId)) {
    alert(ALERT_MESSAGE.DELETING_STATION_EXCLUDED_IN_LINE);
    return;
  };

  const newStationList = state.get(STATE_KEY.STATION_LIST).filter(station => station.id !== Number(stationId));
  const stationItem = $(`.${SELECTOR_CLASS.STATION_LIST_ITEM}[data-station-id="${stationId}"]`);
  setTurnRedAnimation(stationItem);
  requestStationDelete(stationId)
    .then(() => {
      setFadeOutAnimation(stationItem);
      wait(100).then(() => {
        state.update(STATE_KEY.STATION_LIST, newStationList);
      });
    })
    .catch(error => {
      cancelTurnRedAnimation(stationItem);
      console.log(error);
    });
}

function isStationExistInLine(stationId) {
  const lineList = state.get(STATE_KEY.LINE_LIST);

  return lineList.some(line =>  line.stations.some(station => station.id === stationId));
}