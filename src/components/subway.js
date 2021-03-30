import { SELECTOR_ID } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/dom.js';

export default class Subway extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

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

  #getWrapperTemplate() {
    return `
      전체 보기
    `;
  }

  // #getTemplate() {
  //   return `
  //     <option>${lineName}</option>
  //   `;
  // }
}
