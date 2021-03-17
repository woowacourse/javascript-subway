import { EntryOptionPlugin } from 'webpack';
import { SELECTOR_ID } from '../constants.js';

export default class SignupForm {
  #selector;
  constructor(selector = `#${SELECTOR_ID.SIGN_UP_FORM}`) {
    this.#selector = selector;
  }

  #initEvents() {
    $(this.#selector).addEventListener('submit', e => {
      e.preventDefault();
      console.log('hi');
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
      <div class="input-control">
        <label for="password-confirm" class="input-label" hidden>비밀번호 확인</label>
        <input
          type="password"
          id="password-confirm"
          name="password-confirm"
          class="input-field"
          placeholder="비밀번호 확인"
        />
      </div>
      <div class="input-control">
        <button type="button" name="submit" class="input-submit w-100 bg-cyan-300">확인</button>
      </div>
    `;
  }
}
