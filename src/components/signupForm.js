import { SELECTOR_ID } from '../constants.js';
import { $ } from '../utils/utils.js';
import { requestSignUp } from '../api/member.js';

export default class SignUp {
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
    this.#initEvents();
  }

  #initEvents() {
    $(this.#targetSelector).addEventListener('submit', e => {
      e.preventDefault();
      const { email, name, password } = e.target;
      requestSignUp(email.value, name.value, password.value).then(isSignupOK => {
        if (isSignupOK) {
          history.back();
          return;
        }
        alert('회원가입에 실패하였습니다.');
      });
    });
  }

  #getWrapperTemplate() {
    return `
      <div data-test-id="signup" class="wrapper p-10 bg-white fade-in">
        <div class="heading">
          <h2 class="text">📝 회원가입</h2>
        </div>
        <form id="${SELECTOR_ID.SIGN_UP_FORM}" name="login" class="form"></form>
      </div>
    `;
  }

  #getTemplate() {
    return `
      <div class="input-control">
        <label for="email" class="input-label" hidden>이메일</label>
        <input type="email" id="${SELECTOR_ID.SIGN_UP_EMAIL_INPUT}" name="email" class="input-field" placeholder="이메일" required />
      </div>
      <div class="input-control">
        <label for="name" class="input-label" hidden>이름</label>
        <input type="text" id="${SELECTOR_ID.SIGN_UP_NAME_INPUT}" name="name" class="input-field" placeholder="이름" />
      </div>
      <div class="input-control">
        <label for="password" class="input-label" hidden>비밀번호</label>
        <input type="password" id="${SELECTOR_ID.SIGN_UP_PASSWORD_INPUT}" name="password" class="input-field" placeholder="비밀번호" />
      </div>
      <div class="input-control">
        <label for="password-confirm" class="input-label" hidden>비밀번호 확인</label>
        <input
          type="password"
          id="${SELECTOR_ID.SIGN_UP_PASSWORD_CHECK_INPUT}"
          name="password-confirm"
          class="input-field"
          placeholder="비밀번호 확인"
        />
      </div>
      <div class="input-control">
        <button type="submit" name="submit" class="input-submit w-100 bg-cyan-300">확인</button>
      </div>
    `;
  }
}
