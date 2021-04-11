import { SELECTOR_ID, STATE_KEY } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/dom.js';

export default class Main extends Observer {
  #targetSelector = `#${SELECTOR_ID.GUIDE_WRAPPER}`;
  #parentSelector;
  #state;

  constructor(state, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const $targetContainer = $(this.#targetSelector);
    if (!$targetContainer) return;

    $targetContainer.innerHTML = this.#getMainTemplate();
  }

  #getWrapperTemplate() {
    return `<div id="${SELECTOR_ID.GUIDE_WRAPPER}" class="fade-in"></div>`;
  }

  #getMainTemplate() {
    const isLoggedIn = this.#state.get(STATE_KEY.IS_LOGGED_IN);
    return `
      <div data-test-id="" class="d-flex flex-col">
        <div class="d-flex flex-col justify-center items-center">
          <img src="/images/subway_emoji.png" width="200" />
          <img src="/images/welcome.png" class="${isLoggedIn ? '' : 'd-none'}"/>
        </div>
        <p class="mt-0 text-center ${
          isLoggedIn ? 'd-none' : ''
        }">지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.</p>
      </div>
    `;
  }
}
