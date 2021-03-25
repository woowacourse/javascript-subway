import { SELECTOR_ID } from '../constants.js';
import { $ } from '../utils/dom.js';

export default class Subway {
  #targetSelector;
  #parentSelector;
  #state;

  // TODO: targetSelector 기본값 만들어주기
  constructor(state, targetSelector, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    // $(this.#targetSelector).innerHTML = this.#getTemplate();
  }

  // TODO: fade-in 적용하기
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