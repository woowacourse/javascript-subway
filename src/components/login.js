import { SELECTOR_ID } from '../constants.js';
import { delegateLoginClickEvent, delegateLoginSubmitEvent } from '../delegators/login.js';
import { $ } from '../utils/dom.js';

export default class Login {
  #targetSelector = `#${SELECTOR_ID.LOG_IN_FORM}`;
  #parentSelector;

  constructor(parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    this.#parentSelector = parentSelector;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    const targetContainer = $(this.#targetSelector);
    if (!targetContainer) return;
    targetContainer.innerHTML = this.#getLoginTemplate();
  }

  initEvents() {
    $(this.#targetSelector).addEventListener('submit', delegateLoginSubmitEvent);
    $(this.#targetSelector).addEventListener('click', delegateLoginClickEvent);
  }

  #getWrapperTemplate() {
    return `
      <div data-test-id="login" class="wrapper p-10 bg-white fade-in">
        <div class="heading">
          <h2>👋 로그인</h2>
        </div>
        <form id="${SELECTOR_ID.LOG_IN_FORM}" name="login" class="form"></form>
      </div>
    `;
  }

  #getLoginTemplate() {
    return `
      <div class="input-control">
        <label for="email" class="input-label" hidden>이메일</label>
        <input id="${SELECTOR_ID.LOG_IN_EMAIL_INPUT}" type="email" name="email" class="input-field" placeholder="이메일" required />
      </div>
      <div class="input-control">
        <label for="password" class="input-label" hidden>비밀번호</label>
        <input id="${SELECTOR_ID.LOG_IN_PASSWORD_INPUT}" type="password" name="password" class="input-field" placeholder="비밀번호" />
      </div>
      <div class="input-control w-100">
        <button id="${SELECTOR_ID.LOG_IN_BUTTON}" type="submit" name="submit" class="input-submit w-100 bg-cyan-300">확인</button>
      </div>
      <p class="text-gray-700 pl-2">
        아직 회원이 아니신가요?
        <a id="${SELECTOR_ID.SIGN_UP_BUTTON}" href="/signup">회원가입</a>
      </p>
    `;
  }
}
