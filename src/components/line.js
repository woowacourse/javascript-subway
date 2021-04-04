import { SELECTOR_CLASS, SELECTOR_ID } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/utils.js';

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
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    $(this.#targetSelector).innerHTML = this.#getTemplate();
  }

  #getWrapperTemplate() {
    return `
      <div data-test-id="lines" class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
          <button type="button" class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2">노선 추가</button>
        </div>
        <ul id="${SELECTOR_ID.LINE_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getTemplate() {
    return this.#state
      .get('lineList')
      .map(line => this.#getLineTemplate(line.name))
      .join('');
  }

  #getLineTemplate(lineName) {
    return `
      <li class="d-flex items-center py-2 relative">
        <span class="subway-line-color-dot bg-blue-400"></span>
        <span class="w-100 pl-6 subway-line-list-item-name">${lineName}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
      <hr class="my-0" />
    `;
  }
}
