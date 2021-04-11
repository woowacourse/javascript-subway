import { SELECTOR_CLASS, SELECTOR_ID, SELECTOR_NAME, STATE_KEY, ALERT_MESSAGE } from '../constants.js';
import { $, closeModal } from '../utils/dom.js';
import { state } from '../store.js';
import { isProperLineNameLength, isDuplicatedLineExist } from '../validators/line.js';
import { requestLineRegistration, requestLineUpdate } from '../api/line.js';

export function delegateLineModalSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.LINE_REGISTER_FORM)) {
    onLineItemRegister(target);
    closeModal();
  }
  if (target.classList.contains(SELECTOR_CLASS.LINE_UPDATE_FORM)) {
    onLineItemUpdate(target);
    closeModal();
  }
}

export function delegateLineModalClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.COLOR_OPTION)) {
    onColorPickerClick(target);
  }

  if (target.closest(`.${SELECTOR_CLASS.LINE_LIST_MODAL_CLOSE}`)) {
    closeModal();
  }
}

function onColorPickerClick(target) {
  const color = target.dataset.color;
  const indicator = $(`#${SELECTOR_ID.LINE_MODAL_COLOR_INDICATOR}`);
  indicator.className = 'color-input-field text-white';
  indicator.classList.add(`bg-${color}`);
  indicator.dataset.color = `bg-${color}`;
}

function onLineItemRegister(target) {
  const lineName = target[SELECTOR_NAME.LINE_NAME].value;
  const upStationId = Number(target[SELECTOR_NAME.UP_STATION].value);
  const downStationId = Number(target[SELECTOR_NAME.DOWN_STATION].value);
  const distance = Number(target[SELECTOR_NAME.LINE_DISTANCE].value);
  const duration = Number(target[SELECTOR_NAME.LINE_DURATION].value);
  const color = target[SELECTOR_NAME.LINE_COLOR].dataset.color;
  const lineList = state.get(STATE_KEY.LINE_LIST);

  if (!isProperLineNameLength(lineName)) {
    alert(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
    return;
  }

  if (isDuplicatedLineExist(lineName, lineList)) {
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
}

function onLineItemUpdate(target) {
  const newLine = {
    id: state.get(STATE_KEY.TARGET_LINE_ID),
    name: target[SELECTOR_NAME.LINE_NAME].value,
    color: target[SELECTOR_NAME.LINE_COLOR].dataset.color,
  };
  const lineList = state.get(STATE_KEY.LINE_LIST);
  const isNewLineApplied = tryApplyingNewLine(newLine, lineList);
  if (!isNewLineApplied) return;

  requestLineUpdate(newLine)
    .then(() => {
      state.update(STATE_KEY.LINE_LIST, lineList);
    })
    .catch(error => {
      console.log(error);
      alert(ALERT_MESSAGE.LINE_UPDATE_FAILED);
    });
}

function tryApplyingNewLine(newLine, lineList) {
  const targetLine = lineList.find(line => line.id === newLine.id);
  if (!isProperLineNameLength(newLine.name)) {
    alert(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
    return false;
  }
  if (isDuplicatedLineExist({ lineId: targetLine.id, lineName: newLine.name }, lineList)) {
    alert(ALERT_MESSAGE.DUPLICATED_LINE_NAME_EXIST);
    return false;
  }
  targetLine.name = newLine.name;
  targetLine.color = newLine.color;

  return true;
}
