import { SELECTOR_ID } from '../constants';
import Observer from '../lib/Observer';
import { $ } from '../utils/utils';

export default class Station extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(
    state,
    targetSelector = `#${SELECTOR_ID.STATION_LIST}`,
    parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`
  ) {
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
      <div data-test-id="stations" class="wrapper bg-white p-10 fade-in">
        <div class="heading"><h2 class="mt-1">🚉 역 관리</h2></div>
        <form>
          <div class="d-flex w-100">
            <label for="station-name" class="input-label" hidden> 역 이름 </label
            ><input
              type="text"
              id="station-name"
              name="stationName"
              class="input-field"
              placeholder="역 이름"
              required
            /><button type="button" name="submit" class="input-submit bg-cyan-300 ml-2">확인</button>
          </div>
        </form>
        <ul id="${SELECTOR_ID.STATION_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getTemplate() {
    return this.#state
      .get('stationList')
      .map(station => this.#getStationTemplate(station))
      .join('');
  }

  #getStationTemplate(stationName) {
    return `
      <li class="station-list-item d-flex items-center py-2">
        <span class="w-100 pl-2">${stationName}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
      <hr class="my-0" />
    `;
  }
}
