import { SELECTOR_ID } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/dom.js';

export default class Subway extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  // TODO: targetSelector 기본값 만들어주기
  constructor(state, targetSelector, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    // const targetContainer = $(this.#targetSelector);
    // if (!targetContainer) return;
    // targetContainer.innerHTML = this.#getTemplate();
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

  // #getTemplate() {
  //   return `
  //     <option>${lineName}</option>
  //   `;
  // }
}
