import PAGE_URLS from "../constants/pages.js";
import { $ } from "../utils/DOM.js";

export default class SignupForm {
  constructor({ $parent }) {
    this.$parent = $parent;
  }

  attachEvent() {
    $("form", this.$parent).addEventListener(
      "submit",
      this.onSubmitSignupForm.bind(this)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmitSignupForm(event) {
    event.preventDefault();

    // TODO: 회원가입 로직 필요
  }

  render() {
    this.$parent.innerHTML = `
      <div class="wrapper p-10 bg-white">
        <div class="heading">
          <h2 class="text">📝 회원가입</h2>
        </div>
        <form name="login" class="form">
          <div class="input-control">
            <label for="email" class="input-label" hidden>이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              class="input-field"
              placeholder="이메일"
              required
            />
          </div>
          <div class="input-control">
            <label for="password" class="input-label" hidden
              >비밀번호</label
            >
            <input
              type="password"
              id="password"
              name="password"
              class="input-field"
              placeholder="비밀번호"
              required
            />
          </div>
          <div class="input-control">
            <label for="password-confirm" class="input-label" hidden
              >비밀번호 확인</label
            >
            <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              class="input-field"
              placeholder="비밀번호 확인"
              required
            />
          </div>
          <div class="input-control">
            <button
              type="submit"
              name="submit"
              class="input-submit w-100 bg-cyan-300"
            >
              확인
            </button>
          </div>
          <p class="text-gray-700 pl-2">
            이미 회원이신가요?
            <a href="${PAGE_URLS.LOGIN}">로그인</a>
          </p>
        </form>
      </div>
    `;

    this.attachEvent();
  }
}
