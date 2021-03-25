import { SELECTOR_CLASS, SELECTOR_ID, PAGE_TITLE, FILE_PATH, STATE_KEY, SELECTOR_NAME, CONFIRM_MESSAGE } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $, closeModal, openModal, setHeadTagAttribute } from '../utils/dom.js';
import { colorOptions } from '../utils/mock.js';
import { state } from '../store.js';
import { delegateLineClickEvent, onColorPickerClick, onLineItemDelete } from '../delegators/line.js';

export default class Line extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.LINE_LIST}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    setHeadTagAttribute(PAGE_TITLE.LINES, FILE_PATH.LINES_CSS);
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    $(this.#targetSelector).innerHTML = this.#getListListTemplate();
    this.#initEvents();
  }

  // TODO : 여러번 클릭되는 문제 해결
  #initEvents() {
    $(this.#parentSelector).addEventListener('click', delegateLineClickEvent);
  }

  #getWrapperTemplate() {
    return `
      <div data-test-id="lines" class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
          <button type="button" class="${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN} modal-trigger-btn bg-cyan-300 ml-2">노선 추가</button>
        </div>
        <ul id="${SELECTOR_ID.LINE_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getListListTemplate() {
    return this.#state.get(STATE_KEY.LINE_LIST).map(this.#getLineTemplate).join('');
  }

  // TODO : line, lineItem, lineListItem, subwayLine 중 네이밍 통일
  // TODO: line의 추가 정보 출력 여부 결정
  #getLineTemplate(line) {
    return `
      <li data-line-id="${line.id}" class="${SELECTOR_CLASS.LINE_LIST_ITEM} d-flex items-center py-2 relative">
        <span class="subway-line-color-dot ${line.color}"></span>
        <span class="w-100 pl-6 subway-line-list-item-name">${line.name}</span>
        <button type="button" data-line-id="${line.id}" class="${SELECTOR_CLASS.LINE_LIST_MODAL_OPEN} ${SELECTOR_CLASS.LINE_LIST_ITEM_EDIT} bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" data-line-id="${line.id}" class="${SELECTOR_CLASS.LINE_DELETE_BUTTON} bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
      <hr class="my-0" />
    `;
  }

  // TODO: 로그인시 서버 데이터와 싱크 맞추기(지금은 새로고침 해야 동기화됨)
}
