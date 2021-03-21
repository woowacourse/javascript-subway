import { SELECTOR_ID, STATE_KEY } from '../constants.js';
import { $ } from '../utils/utils.js';

export default class Section {
  #lineListSelector;
  #sectionListSelector;
  #parentSelector;
  #state;

  constructor(
    state,
    lineListSelector = `#${SELECTOR_ID.SUBWAY_LINE}`,
    sectionListSelector = `#${SELECTOR_ID.SECTION_LIST}`,
    parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`
  ) {
    this.#lineListSelector = lineListSelector;
    this.#sectionListSelector = sectionListSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    $(this.#sectionListSelector).innerHTML = this.#state
      .get(STATE_KEY.SECTION_LIST)
      .map(section => this.#getSectionTemplate(section.name))
      .join('');

    $(this.#lineListSelector).innerHTML = this.#state
      .get(STATE_KEY.LINE_LIST)
      .map(line => this.#getLineTemplate(line.name))
      .join('');
  }

  #getWrapperTemplate() {
    return `
      <div class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          <button
            type="button"
            class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
          >
            구간 추가
          </button>
        </div>
        <form class="d-flex items-center pl-1">
          <label for="${SELECTOR_ID.SUBWAY_LINE}" class="input-label" hidden>노선</label>
          <select id="${SELECTOR_ID.SUBWAY_LINE}" class="bg-blue-400"></select>
        </form>
        <ul id="${SELECTOR_ID.SECTION_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getLineTemplate(lineName) {
    return `
      <option>${lineName}</option>
    `;
  }

  #getSectionTemplate(sectionName) {
    return `
      <li class="d-flex items-center py-2 relative">
        <span class="w-100 pl-6">${sectionName}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm"
        >
          삭제
        </button>
      </li>
      <hr class="my-0" />
    `;
  }
}
