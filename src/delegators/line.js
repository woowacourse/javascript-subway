import { SELECTOR_CLASS, SELECTOR_ID, SELECTOR_NAME, STATE_KEY, ALERT_MESSAGE, CONFIRM_MESSAGE } from '../constants.js';
import { state } from '../store.js';
import { $, cancelTurnRedAnimation, closeModal, setFadeOutAnimation, setTurnRedAnimation } from '../utils/dom.js';
import { wait } from '../utils/utils.js';
import { requestLineRegistration, requestLineDelete } from '../api/line.js';
import { isProperLineNameLength, isDuplicatedLineNameExist } from '../validators/line.js';
import { requestStationDelete } from '../api/station.js';

export function delegateLineClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.COLOR_OPTION)) {
    onColorPickerClick(target);
  }

  if (target.classList.contains(SELECTOR_CLASS.LINE_DELETE_BUTTON) && confirm(CONFIRM_MESSAGE.DELETE)) {
    onDeleteLineItem(target);
  }
}

export function delegateLineSubmitEvent(event) {
  const { target } = event;
  if (target.id === SELECTOR_ID.SUBWAY_LINE_FORM) {
    onSubmitLineItem(target);
  }
}

function onColorPickerClick(target) {
  const color = target.dataset.color;
  const indicator = $(`#${SELECTOR_ID.SUBWAY_LINE_COLOR_INDICATOR}`);
  indicator.className = 'color-input-field text-white';
  indicator.classList.add(`bg-${color}`);
  indicator.dataset.color = `bg-${color}`;
}

function onSubmitLineItem(target) {
  const lineName = target[SELECTOR_NAME.SUBWAY_LINE_NAME].value;
  const upStationId = target[SELECTOR_NAME.SUBWAY_UP_STATION].value;
  const downStationId = target[SELECTOR_NAME.SUBWAY_DOWN_STATION].value;
  const distance = target[SELECTOR_NAME.LINE_DISTANCE].value;
  const duration = target[SELECTOR_NAME.LINE_DURATION].value;
  const color = target[SELECTOR_NAME.SUBWAY_LINE_COLOR].dataset.color;
  const lineList = state.get(STATE_KEY.LINE_LIST);

  if (!isProperLineNameLength(lineName)) {
    alert(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
    return;
  }

  if (isDuplicatedLineNameExist(lineName, lineList)) {
    alert(ALERT_MESSAGE.DUPLICATED_LINE_NAME_EXIST);
    return;
  }

  const newLine = {
    name: lineName,
    color,
    upStationId,
    downStationId,
    distance,
    duration,
  };

  requestLineRegistration(newLine).then(line => {
    lineList.push(line);
    state.update(STATE_KEY.LINE_LIST, lineList);
  });

  closeModal();
}

function onDeleteLineItem(target) {
  const { lineId } = target.dataset;
  const newLineList = state.get(STATE_KEY.LINE_LIST).filter(line => line.id !== Number(lineId));
  const lineItem = $(`.${SELECTOR_CLASS.LINE_LIST_ITEM}[data-line-id="${lineId}"]`);
  setTurnRedAnimation(lineItem);
  requestLineDelete(lineId)
    .then(() => {
      setFadeOutAnimation(lineItem);
      wait(100).then(() => {
        state.update(STATE_KEY.LINE_LIST, newLineList);
      });
    })
    .catch(error => {
      cancelTurnRedAnimation(lineItem);
      console.log(error);
    });
}
