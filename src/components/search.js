import { SELECTOR_ID } from '../constants.js';
import { $ } from '../utils/dom.js';

export default class Search {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
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
      검색 페이지
    `;
  }

  // #getTemplate() {
  //   return `
  //     <option>${lineName}</option>
  //   `;
  // }
}
