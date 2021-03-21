import { SELECTOR_ID, STATE_KEY } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/utils.js';

export default class Main extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(
    state,
    targetSelector = `#${SELECTOR_ID.GUIDE_WRAPPER}`,
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
    return `<div id="${SELECTOR_ID.GUIDE_WRAPPER}" class="fade-in"></div>`;
  }

  // 로그인 여부(accessToken 존재 여부)에 따라 보여주는 페이지가 달라야 한다.
  #getTemplate() {
    return this.#state.get(STATE_KEY.IS_LOGGED_IN)
      ? `<div data-test-id="" class="d-flex flex-col">
          <div class="d-flex justify-center"><img src="/images/welcome.png" /></div>
        </div>`
      : `<div data-test-id="" class="d-flex flex-col">
          <div class="d-flex justify-center"><img src="/images/subway_emoji.png" width="200" /></div>
          <p class="mt-0 text-center">지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.</p>
        </div>
      `;
  }
}
