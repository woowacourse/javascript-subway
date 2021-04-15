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
    const { [SELECTOR_NAME.STATION_NAME]: $stationNameInput } = target;
    registerStation($stationNameInput);
    return;
  }
}

export function delegateStationClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE)) {
    const { stationId, stationName } = target.dataset;
    openStationItemInput(stationId, stationName);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_DELETE)) {
    if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

    const stationId = Number(target.dataset.stationId);
    deleteStation(stationId);
    return;
  }
}

export function delegateStationFocusOutEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_INPUT)) {
    const newStationName = target.value;
    const targetStationId = Number(target.dataset.stationId);
    updateStation(newStationName, targetStationId);
    return;
  }
}

async function registerStation($stationNameInput) {
  const targetStationName = $stationNameInput.value;
  const stationList = state.get(STATE_KEY.STATION_LIST);

  if (!isProperStationNameLength(targetStationName)) {
    alert(ALERT_MESSAGE.NOT_PROPER_STATION_NAME_LENGTH);
    $stationNameInput.value = '';
    return;
  }

  if (isDuplicatedStationExist({ name: targetStationName }, stationList)) {
    alert(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
    $stationNameInput.value = '';
    return;
  }

  try {
    const { id, name } = await requestStationRegistration(targetStationName);
    state.update(STATE_KEY.STATION_LIST, [...stationList, { id, name }]);
  } catch (error) {
    console.log(error);
    alert(ALERT_MESSAGE.STATION_REGISTRATION_FAILED);
  } finally {
    $stationNameInput.value = '';
  }
}

function openStationItemInput(stationId, stationName) {
  const $stationInput = $(`.${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}[data-station-id="${stationId}"]`);
  $stationInput.value = stationName;
  showElement($stationInput);
  $stationInput.focus();
}

async function updateStation(newStationName, targetStationId) {
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

  if (isDuplicatedStationExist({ id: targetStationId, name: newStationName }, stationList)) {
    alert(ALERT_MESSAGE.DUPLICATED_STATION_NAME_EXIST);
    return;
  }

  targetStationItem.name = newStationName;

  try {
    await requestStationUpdate(targetStationId, newStationName);
    state.update(STATE_KEY.STATION_LIST, stationList);
  } catch (error) {
    console.log(error);
    alert(ALERT_MESSAGE.STATION_UPDATE_FAILED);
  }
}

async function deleteStation(stationId) {
  if (isStationExistInLine(stationId)) {
    alert(ALERT_MESSAGE.DELETING_STATION_EXCLUDED_IN_LINE);
    return;
  }

  const newStationList = state.get(STATE_KEY.STATION_LIST).filter(station => station.id !== Number(stationId));
  const stationItem = $(`.${SELECTOR_CLASS.STATION_LIST_ITEM}[data-station-id="${stationId}"]`);
  setTurnRedAnimation(stationItem);

  try {
    await requestStationDelete(stationId);
    setFadeOutAnimation(stationItem);
    await wait(100);
    state.update(STATE_KEY.STATION_LIST, newStationList);
  } catch (error) {
    cancelTurnRedAnimation(stationItem);
    console.log(error);
  }
}

function isStationExistInLine(stationId) {
  const lineList = state.get(STATE_KEY.LINE_LIST);

  return lineList.some(line => line.stations.some(station => station.id === stationId));
}
