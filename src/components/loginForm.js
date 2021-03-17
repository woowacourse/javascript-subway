import { SELECTOR_ID } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/querySelector.js';
import { requestLoginToken } from '../api/member.js';

export default class LoginForm {
  #selector;
  constructor(selector = `#${SELECTOR_ID.LOG_IN_FORM}`) {
    this.#selector = selector;
  }

  #initEvents() {
    console.log(this.#selector);
    $(this.#selector).addEventListener('submit', e => {
      e.preventDefault();
      const { email, password } = e.target;
      requestLoginToken(email, password);
    });
  }

  createComponent() {
    const parent = $(this.#selector);
    parent.innerHTML = this.#getTemplate();
    this.#initEvents();
  }

  #getTemplate() {
    return `
      <div class="input-control">
        <label for="email" class="input-label" hidden>이메일</label>
        <input type="email" id="email" name="email" class="input-field" placeholder="이메일" required />
      </div>
      <div class="input-control">
        <label for="password" class="input-label" hidden>비밀번호</label>
        <input type="password" id="password" name="password" class="input-field" placeholder="비밀번호" />
      </div>
      <div class="input-control w-100">
        <button type="submit" name="submit" class="input-submit w-100 bg-cyan-300">확인</button>
      </div>
      <p class="text-gray-700 pl-2">
        아직 회원이 아니신가요?
        <a href="/pages/signup.html">회원가입</a>
      </p>
    `;
  }
}
