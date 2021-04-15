import { SELECTOR_CLASS, SELECTOR_ID, SELECTOR_NAME, STATE_KEY, ALERT_MESSAGE } from '../constants.js';
import { $, closeModal } from '../utils/dom.js';
import { state } from '../store.js';
import { isProperLineNameLength, isDuplicatedLineExist } from '../validators/line.js';
import { requestLineRegistration, requestLineUpdate } from '../api/line.js';

export function delegateLineModalSubmitEvent(event) {
  event.preventDefault();
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.LINE_REGISTER_FORM)) {
    const lineInput = {
      name: target[SELECTOR_NAME.LINE_NAME].value,
      upStationId: Number(target[SELECTOR_NAME.UP_STATION].value),
      downStationId: Number(target[SELECTOR_NAME.DOWN_STATION].value),
      distance: Number(target[SELECTOR_NAME.LINE_DISTANCE].value),
      duration: Number(target[SELECTOR_NAME.LINE_DURATION].value),
      color: target[SELECTOR_NAME.LINE_COLOR].dataset.color,
    };
    registerLine(lineInput);
    closeModal();
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.LINE_UPDATE_FORM)) {
    const newLine = {
      id: state.get(STATE_KEY.TARGET_LINE_ID),
      name: target[SELECTOR_NAME.LINE_NAME].value,
      color: target[SELECTOR_NAME.LINE_COLOR].dataset.color,
    };
    updateLine(newLine);
    closeModal();
    return;
  }
}

export function delegateLineModalClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.COLOR_OPTION)) {
    pickColor(target);
    return;
  }

  if (target.closest(`.${SELECTOR_CLASS.LINE_LIST_MODAL_CLOSE}`)) {
    closeModal();
    return;
  }
}

function pickColor(target) {
  const color = target.dataset.color;
  const indicator = $(`#${SELECTOR_ID.LINE_MODAL_COLOR_INDICATOR}`);
  indicator.className = 'color-input-field text-white';
  indicator.classList.add(`bg-${color}`);
  indicator.dataset.color = `bg-${color}`;
}

async function registerLine(lineInput) {
  const lineList = state.get(STATE_KEY.LINE_LIST);

  if (!isProperLineNameLength(lineInput.name)) {
    alert(ALERT_MESSAGE.NOT_PROPER_LINE_NAME_LENGTH);
    return;
  }

  if (isDuplicatedLineExist(lineInput.name, lineList)) {
    alert(ALERT_MESSAGE.DUPLICATED_LINE_NAME_EXIST);
    return;
  }

  try {
    const newline = await requestLineRegistration(lineInput);
    lineList.push(newline);
    state.update(STATE_KEY.LINE_LIST, lineList);
  } catch (error) {
    console.log(error);
    alert(ALERT_MESSAGE.LINE_GET_FAILED);
  }
}

async function updateLine(newLine) {
  const lineList = state.get(STATE_KEY.LINE_LIST);
  const isNewLineApplied = tryApplyingNewLine(newLine, lineList);
  if (!isNewLineApplied) return;

  try {
    await requestLineUpdate(newLine);
    state.update(STATE_KEY.LINE_LIST, lineList);
  } catch (error) {
    console.log(error);
    alert(ALERT_MESSAGE.LINE_UPDATE_FAILED);
  }
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
