import { SELECTOR_CLASS, SELECTOR_ID, SELECTOR_NAME, STATE_KEY, ALERT_MESSAGE, CONFIRM_MESSAGE } from '../constants.js';
import { state } from '../store.js';
import { $, cancelTurnRedAnimation, closeModal, openModal, setFadeOutAnimation, setTurnRedAnimation } from '../utils/dom.js';
import { wait } from '../utils/utils.js';
import { requestLineRegistration, requestLineDelete } from '../api/line.js';
import { isProperLineNameLength, isDuplicatedLineNameExist } from '../validators/line.js';

export function delegateLineClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.LINE_DELETE_BUTTON) && confirm(CONFIRM_MESSAGE.DELETE)) {
    onLineItemDelete(target);
  }

  if (target.classList.contains(SELECTOR_CLASS.LINE_LIST_MODAL_OPEN)) {
    openModal();
  }
  
  if (target.classList.contains(SELECTOR_CLASS.LINE_LIST_ITEM_EDIT)) {
    const lineId = Number(target.dataset.lineId);
    state.update(STATE_KEY.TARGET_LINE_ID, lineId);
    openModal();
  }
}

export function onLineItemDelete(target) {
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
