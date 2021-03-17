import { SELECTOR_ID } from '../constants';
import Observer from '../lib/Observer';
import { $ } from '../utils/querySelector';

export default class StationList extends Observer {
  #selector;
  #state;

  constructor(state, selector = `#${SELECTOR_ID.STATION_LIST}`) {
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
    return this.#state.stationList.map(station => this.#getStationTemplate(station)).join('');
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
