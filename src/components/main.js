import { ALERT_MESSAGE, SELECTOR_ID, STATE_KEY } from '../constants.js';
import Observer from '../lib/Observer.js';
import { requestUserName } from '../api/member.js';
import { $ } from '../utils/dom.js';

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

  update() {
    this.renderComponent();
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  async renderComponent() {
    const targetContainer = $(this.#targetSelector);
    if (!targetContainer) return;
    targetContainer.innerHTML = await this.#getMainTemplate();
  }

  #getWrapperTemplate() {
    return `<div id="${SELECTOR_ID.GUIDE_WRAPPER}" class="fade-in"></div>`;
  }

  async #getMainTemplate() {
    try {
      const userName = await requestUserName();
      return this.#state.get(STATE_KEY.IS_LOGGED_IN)
      ? `<div data-test-id="" class="d-flex flex-col">
          <div class="d-flex justify-center"><img src="/images/subway_emoji.png" width="200" /></div>
          <p class="mt-0 text-center">${userName}님, 안녕하세요!</p>
        </div>`
      : `<div data-test-id="" class="d-flex flex-col">
          <div class="d-flex justify-center"><img src="/images/subway_emoji.png" width="200" /></div>
          <p class="mt-0 text-center">지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.</p>
        </div>
      `; 
    } catch(error) {
      console.error(error);
      alert(ALERT_MESSAGE.USER_UNDEFINED);
    }
  }
}
