import { SELECTOR_CLASS, SELECTOR_ID, SELECTOR_NAME, STATE_KEY, ALERT_MESSAGE } from "../constants.js";
import { $, closeModal } from "../utils/dom.js";
import { state } from '../store.js';
import { isProperLineNameLength, isDuplicatedLineNameExist } from '../validators/line.js';
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
  const indicator = $(`#${SELECTOR_ID.LINE_COLOR_INDICATOR}`);
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
}

function onLineItemUpdate(target) {
  const newLine = {
    id: state.get(STATE_KEY.TARGET_LINE_ID),
    name: target[SELECTOR_NAME.LINE_NAME].value, 
    color: target[SELECTOR_NAME.LINE_COLOR].dataset.color
  }
  requestLineUpdate(newLine)
    .then(updateLine)
    .catch(error => {
      console.log(error);
      alert(ALERT_MESSAGE.LINE_UPDATE_FAILED);
    });
}

function updateLine(newLine) {
  const lineList = state.get(STATE_KEY.LINE_LIST);
  lineList.forEach(line => {
    if (line.id === newLine.id) {
      line.name = newLine.name;
      line.color = newLine.color;    
    }
  })
  state.update(STATE_KEY.LINE_LIST, lineList);
}