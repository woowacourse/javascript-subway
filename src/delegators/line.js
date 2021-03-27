import { SELECTOR_CLASS, STATE_KEY, CONFIRM_MESSAGE } from '../constants.js';
import { state } from '../store.js';
import { $, cancelTurnRedAnimation, openModal, setFadeOutAnimation, setTurnRedAnimation } from '../utils/dom.js';
import { wait } from '../utils/utils.js';
import { requestLineDelete } from '../api/line.js';

export function delegateLineClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.LINE_DELETE_BUTTON) && confirm(CONFIRM_MESSAGE.DELETE)) {
    onLineItemDelete(target);
    return;
  }

  if (target.classList.contains(SELECTOR_CLASS.LINE_LIST_MODAL_OPEN)) {
    onLineModalOpen();
    openModal();
    return;
  }

  if (target.classList.contains(SELECTOR_CLASS.LINE_LIST_ITEM_EDIT)) {
    onLineItemEdit(target);
    openModal();
    return;
  }
  // TODO: 리스트 아이템 클릭을 구현할 것인지 결정하기
  if (target.closest(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`)) {
    const targetListItem = target.closest(`.${SELECTOR_CLASS.LINE_LIST_ITEM}`);
    onLineListItemClick(targetListItem);
    openModal();
    return;
  }
}

function onLineItemDelete(target) {
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

function onLineModalOpen() {
  state.update(STATE_KEY.TARGET_LINE_ID, -1);
}

function onLineItemEdit(target) {
  state.update(STATE_KEY.TARGET_LINE_ID, Number(target.dataset.lineId));
}

function onLineListItemClick(target) {
  state.update(STATE_KEY.TARGET_LINE_ID, Number(target.dataset.lineId));
}
