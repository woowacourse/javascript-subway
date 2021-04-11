import { SELECTOR_CLASS, STATE_KEY, CONFIRM_MESSAGE } from '../constants.js';
import { state } from '../store.js';
import { $, cancelTurnRedAnimation, openModal, setFadeOutAnimation, setTurnRedAnimation } from '../utils/dom.js';
import { wait } from '../utils/utils.js';
import { requestLineDelete } from '../api/line.js';

export function delegateLineClickEvent(event) {
  const { target } = event;

  if (target.classList.contains(SELECTOR_CLASS.LINE_LIST_MODAL_OPEN)) {
    openLineModal();
    openModal();
  }

  if (target.classList.contains(SELECTOR_CLASS.LINE_LIST_ITEM_UPDATE)) {
    initLineUpdateModal(target);
    openModal();
  }

  if (target.classList.contains(SELECTOR_CLASS.LINE_DELETE_BUTTON)) {
    if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

    deleteLineItem(target);
  }
}

function deleteLineItem(target) {
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

function openLineModal() {
  state.update(STATE_KEY.TARGET_LINE_ID, -1);
}

function initLineUpdateModal(target) {
  state.update(STATE_KEY.TARGET_LINE_ID, Number(target.dataset.lineId));
}
