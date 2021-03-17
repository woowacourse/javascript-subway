import { SELECTOR_CLASS } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/querySelector.js';

export default class LineList extends Observer {
  #selector;
  #state;

  constructor(state, selector = `#${SELECTOR_CLASS.LINE_LIST}`) {
    super();
    this.#selector = selector;
    this.#state = state;
  }

  createComponent() {
    const parent = $(this.#selector);
    parent.innerHTML = this.#getTemplate();
  }

  update() {
    this.createComponent();
  }

  #getTemplate() {
    return this.#state.lineList.map(line => this.#getLineTemplate(line));
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
