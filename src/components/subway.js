import { SELECTOR_ID, SELECTOR_CLASS, STATE_KEY } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/dom.js';

export default class Subway extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.SUBWAY_MAP_CONTAINER}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const targetContainer = $(this.#targetSelector);
    if (!targetContainer) return;
    const lineList = this.#state.get(STATE_KEY.LINE_LIST);
    targetContainer.innerHTML = lineList.map(line => this.#getTemplate(line.name, line.stations)).join('');
  }

  // TODO: fade-in 적용하기
  #getWrapperTemplate() {
    return `
      <div class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
        </div>
        <div id="${SELECTOR_ID.SUBWAY_MAP_CONTAINER}"></div>
      </div>
    `;
  }

  #getTemplate(lineName, stations) {
    return `
      <ul class="${SELECTOR_CLASS.SUBWAY_MAP_LINE}">
        <li data-marker="lineName">${lineName}</li>
        ${stations.map(station => `
          <li class="subway-map-stations">
            <span data-marker="station-line"></span>
            <span data-marker="station"></span>
            <span data-marker="station-name">${station.name}</span>
          </li>
        `).join('')}
      </ul>
    `;
  }
}
