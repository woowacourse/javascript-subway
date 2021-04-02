import { ALERT_MESSAGE, SELECTOR_CLASS, SELECTOR_ID, STATE_KEY, CONFIRM_MESSAGE } from '../constants';
import { state } from '../store.js';
import { isDuplicatedStationNameExist, isProperStationNameLength } from '../validators/station.js';
import { requestStationDelete, requestStationRegistration, requestStationUpdate } from '../api/station.js';
import { requestLineList } from '../api/line.js';
import { $, setTurnRedAnimation, setFadeOutAnimation, showElement, cancelTurnRedAnimation, resetForm } from '../utils/dom.js';
import { wait } from '../utils/utils';

export function delegateStationSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.id === SELECTOR_ID.STATION_FORM) {
    onStationFormSubmit(target);
    resetForm(target);
  }
}

export function delegateStationClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE)) {
    onStationItemInputOpen(target);
  }
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_DELETE) && confirm(CONFIRM_MESSAGE.DELETE)) {
    onStationItemDelete(target);
  }
}

export function delegateStationFocusOutEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.STATION_LIST_ITEM_INPUT)) {
    onStationItemUpdate(target);
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

function onStationItemUpdate(target) {
  const { stationId } = target.dataset;
  const stationList = state.get(STATE_KEY.STATION_LIST);
  const newStationName = target.value;
  const targetStationItem = stationList.find(station => station.id === Number(stationId));
  if (targetStationItem.name === newStationName || !newStationName) {
    state.update(STATE_KEY.STATION_LIST, stationList);
    return;
  }
  requestStationUpdate(stationId, newStationName).then(async () => {
    targetStationItem.name = newStationName;
    state.update(STATE_KEY.STATION_LIST, stationList);
    const lineList = await requestLineList();
    lineList.map(lineItem => ({
      id: lineItem.id,
      name: lineItem.name,
      color: lineItem.color,
      stations: lineItem.stations,
      sections: lineItem.sections,
    }));
    if (lineList.length === 0) return;
    state.update(STATE_KEY.LINE_LIST, lineList);
  });
}

function onStationItemDelete(target) {
  const { stationId } = target.dataset;
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
      alert(ALERT_MESSAGE.STATION_INCLUDED_IN_LINE);
    });
}
