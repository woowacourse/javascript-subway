import {
  FILE_PATH,
  PAGE_TITLE,
  SELECTOR_CLASS,
  SELECTOR_ID,
  SELECTOR_NAME,
  STATE_KEY,
  STYLE_CLASS,
} from '../constants';
import Observer from '../lib/Observer';
import { $, setHeadTagAttribute } from '../utils/dom.js';
import {
  delegateStationClickEvent,
  delegateStationFocusOutEvent,
  delegateStationSubmitEvent,
} from '../delegators/station.js';

export default class Station extends Observer {
  #targetSelector = `#${SELECTOR_ID.STATION_LIST}`;
  #parentSelector;
  #state;

  constructor(state, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    setHeadTagAttribute(PAGE_TITLE.STATIONS, FILE_PATH.STATIONS_CSS);
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const targetContainer = $(this.#targetSelector);
    if (!targetContainer) return;
    targetContainer.innerHTML = this.#getStationListTemplate();
  }

  initEvents() {
    $(this.#parentSelector).addEventListener('submit', delegateStationSubmitEvent);
    $(this.#targetSelector).addEventListener('focusout', delegateStationFocusOutEvent);
    $(this.#targetSelector).addEventListener('click', delegateStationClickEvent);
  }

  #getWrapperTemplate() {
    return `
      <div data-test-id="stations" class="wrapper bg-white p-10 fade-in">
        <div class="heading"><h2 class="mt-1">🚉 역 관리</h2></div>
        <form id="${SELECTOR_ID.STATION_FORM}">
          <div class="d-flex w-100">
            <label for="${SELECTOR_ID.STATION_FORM_NAME_INPUT}" class="input-label" hidden> 역 이름 </label
            ><input
              type="text"
              id="${SELECTOR_ID.STATION_FORM_NAME_INPUT}"
              name="${SELECTOR_NAME.STATION_NAME}"
              class="input-field"
              placeholder="역 이름"
              required
            /><button id="${SELECTOR_ID.STATION_FORM_SUBMIT}" type="submit" name="submit" class="input-submit bg-cyan-300 ml-2">확인</button>
          </div>
        </form>
        <ul id="${SELECTOR_ID.STATION_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getStationListTemplate() {
    return this.#state
      .get(STATE_KEY.STATION_LIST)
      .map(station => this.#getStationTemplate(station))
      .join('');
  }

  #getStationTemplate(station) {
    return `
      <li data-station-id="${station.id}" class="${SELECTOR_CLASS.STATION_LIST_ITEM} d-flex items-center py-2">
        <span class="${SELECTOR_CLASS.STATION_LIST_ITEM_NAME} w-100 pl-2">${station.name}</span>
        <button 
          type="button" 
          class="${SELECTOR_CLASS.STATION_LIST_ITEM_UPDATE} bg-gray-50 text-gray-500 text-sm mr-1"
          data-station-id="${station.id}"
          data-station-name="${station.name}"
        >
          수정
        </button>
        <button 
          type="button" 
          class="${SELECTOR_CLASS.STATION_LIST_ITEM_DELETE} 
          bg-gray-50 text-gray-500 text-sm"
          data-station-id="${station.id}"
          data-station-name="${station.name}"
        >
          삭제
        </button>
        <input data-station-id="${station.id}" class="${STYLE_CLASS.REMOVED} ${SELECTOR_CLASS.STATION_LIST_ITEM_INPUT}" type="text" />
      </li>
      <hr class="my-0" />
    `;
  }
}
