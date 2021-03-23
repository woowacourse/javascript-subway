import Component from "./common/Component.js";
import { loginAPI } from "../APIs/subwayAPI.js";

import { $, $$ } from "../utils/DOM.js";
import { setSessionStorageItem } from "../utils/sessionStorage.js";
import snackbar from "../utils/snackbar.js";

import PAGE_URLS from "../constants/pages.js";
import {
  PASSWORD_MIN_LENGTH,
  EMAIL_REG_EXP,
  TOKEN_STORAGE_KEY,
} from "../constants/general.js";

export default class LoginForm extends Component {
  constructor({ $parent, setIsLoggedIn, pageRouter }) {
    super($parent);
    this.setIsLoggedIn = setIsLoggedIn;
    this.pageRouter = pageRouter;

    this.initContent();
  }

  initContent() {
    const template = `
      <div class="wrapper p-10 bg-white">
        <div class="heading">
          <h2>👋 로그인</h2>
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
            <label for="password" class="input-label" hidden>
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="js-password input-field"
              placeholder="비밀번호"
              required
            />
          </div>
          <p class="js-login-error text-red text-center text-base my-0 ml-4"></p>
          <div class="input-control w-100 mt-2">
            <button
              type="submit"
              name="submit"
              class="input-submit w-100 bg-cyan-200"
              disabled
            >
              확인
            </button>
          </div>
          <p class="text-gray-700 pl-2">
            아직 회원이 아니신가요?
            <a href="${PAGE_URLS.SIGNUP}" class="js-signup-link">회원가입</a>
          </p>
        </form>
      </div>
    `;

    super.initContent(template);
    this.attachEvent();
  }

  attachEvent() {
    const $form = $("form", this.innerElement);

    $form.addEventListener("submit", this.onSubmitLoginForm.bind(this));
    $$("input", $form).forEach(($input) =>
      $input.addEventListener("keyup", this.onTypeInput.bind(this, $form))
    );
    $(".js-signup-link", this.innerElement).addEventListener(
      "click",
      this.onClickSignupLink.bind(this)
    );
  }

  async onSubmitLoginForm(event) {
    event.preventDefault();

    const { target, currentTarget } = event;
    const loginData = {
      email: target.email.value,
      password: target.password.value,
    };

    const loginResult = await loginAPI(loginData);

    if (!loginResult.isSucceeded) {
      $(".js-login-error", currentTarget).textContent = loginResult.message;
      currentTarget.reset();

      return;
    }

    $(".js-login-error", currentTarget).textContent = "";

    setSessionStorageItem(TOKEN_STORAGE_KEY, loginResult.accessToken);

    this.setIsLoggedIn(true);
    snackbar.show(loginResult.message);
  }

  // eslint-disable-next-line class-methods-use-this
  onTypeInput($form) {
    const { email, password, submit } = $form;

    if (
      email.value.match(EMAIL_REG_EXP) &&
      password.value.length >= PASSWORD_MIN_LENGTH
    ) {
      submit.disabled = false;
      submit.classList.replace("bg-cyan-200", "bg-cyan-300");
    } else {
      submit.disabled = true;
      submit.classList.replace("bg-cyan-300", "bg-cyan-200");
    }
  }

  onClickSignupLink(event) {
    if (!event.target.classList.contains("js-signup-link")) {
      return;
    }
    event.preventDefault();

    const path = event.target.getAttribute("href");
    this.pageRouter.movePage(path);
  }

  render() {
    $("form", this.innerElement).reset();
    $(".js-login-error", this.innerElement).textContent = "";

    super.render();
  }
}
