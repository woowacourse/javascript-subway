import { FILE_PATH, PAGE_TITLE, SELECTOR_ID, STATE_KEY } from '../constants.js';
import { delegateSectionClickEvent } from '../delegators/section.js';
import Observer from '../lib/Observer.js';
import { $, setHeadTagAttribute } from '../utils/dom.js';

export default class Section extends Observer {
  #lineListSelector;
  #stationListSelector;
  #parentSelector;
  #state;

  constructor(
    state,
    lineListSelector = `#${SELECTOR_ID.SECTION_LINE}`,
    stationListSelector = `#${SELECTOR_ID.SECTION_STATION_LIST}`,
    parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`
  ) {
    super();
    this.#state = state;
    this.#lineListSelector = lineListSelector;
    this.#stationListSelector = stationListSelector;
    this.#parentSelector = parentSelector;
  }

  renderPage() {
    setHeadTagAttribute(PAGE_TITLE.SECTIONS, FILE_PATH.SECTIONS_CSS);
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const lineListContainer = $(this.#lineListSelector);
    const stationListContainer = $(this.#stationListSelector);
    if (!lineListContainer || !stationListContainer) return;
    
    lineListContainer.innerHTML = this.#state
      .get(STATE_KEY.LINE_LIST)
      .map(line => this.#getLineTemplate(line))
      .join('');
    stationListContainer.innerHTML = this.#state
      .get(STATE_KEY.STATION_LIST)
      .map(station => this.#getStationTemplate(station))
      .join('');
    
    this.#initEvents();
  }

  #initEvents() {
    $(this.#parentSelector).addEventListener('click', delegateSectionClickEvent);
  }

  #getWrapperTemplate() {
    return `
      <div class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          <button
            type="button"
            id="${SELECTOR_ID.SECTION_MODAL_OPEN}"
            class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
          >
            구간 추가
          </button>
        </div>
        <form class="d-flex items-center pl-1">
          <label for="${SELECTOR_ID.SECTION_LINE}" class="input-label" hidden>노선</label>
          <select id="${SELECTOR_ID.SECTION_LINE}" class="bg-blue-400"></select>
        </form>
        <ul id="${SELECTOR_ID.SECTION_STATION_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getLineTemplate(line) {
    return `
      <option>${line.name}</option>
    `;
  }

  #getStationTemplate(station) {
    return `
      <li class="d-flex items-center py-2 relative">
        <span class="w-100 pl-6">${station.name}</span>
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
