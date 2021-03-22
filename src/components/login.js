import { SELECTOR_ID } from '../constants.js';
import { $ } from '../utils/utils.js';

export default class Login {
  #targetSelector;
  #parentSelector;

  constructor(targetSelector = `#${SELECTOR_ID.SIGN_UP_FORM}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    $(this.#targetSelector).innerHTML = this.#getTemplate();
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

  #getTemplate() {
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
