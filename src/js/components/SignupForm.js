import { signupAPI } from "../APIs/subwayAPI.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";
import PAGE_URLS from "../constants/pages.js";
import { $ } from "../utils/DOM.js";

export default class SignupForm {
  constructor({ $parent, pageRouter }) {
    this.$parent = $parent;
    this.pageRouter = pageRouter;
  }

  attachEvent() {
    $("form", this.$parent).addEventListener(
      "submit",
      this.onSubmitSignupForm.bind(this)
    );
    $(".js-password-confirm", this.$parent).addEventListener(
      "keyup",
      this.onTypePasswordConfirm.bind(this)
    );
    $(".js-login-link", this.$parent).addEventListener(
      "click",
      this.onClickLoginLink.bind(this)
    );
  }

  onTypePasswordConfirm({ target }) {
    const $form = $("form", this.$parent);
    const $messageArea = $(".js-pw-confirm-message", this.$parent);

    if (target.value === $form.password.value) {
      $messageArea.innerText = SUCCESS_MESSAGE.PASSWORD_CONFIRM_SUCCESS;
      $messageArea.classList.remove("text-red");
      $messageArea.classList.add("text-green");
    } else {
      $messageArea.innerText = ERROR_MESSAGE.PASSWORD_CONFIRM_FAILURE;
      $messageArea.classList.remove("text-green");
      $messageArea.classList.add("text-red");
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async onSubmitSignupForm(event) {
    event.preventDefault();
    const { target } = event;

    const memberData = {
      email: target.email.value,
      name: target.name.value,
      password: target.password.value,
    };

    const isSucceeded = await signupAPI(memberData);

    if (!isSucceeded) {
      window.alert(ERROR_MESSAGE.SIGNUP_FAILURE);
      target.reset();

      return;
    }

    this.pageRouter.movePage(PAGE_URLS.LOGIN);
  }

  onClickLoginLink(event) {
    if (!event.target.classList.contains("js-login-link")) {
      return;
    }
    event.preventDefault();

    const path = event.target.getAttribute("href");
    this.pageRouter.movePage(path);
  }

  render() {
    this.$parent.innerHTML = `
      <div class="wrapper p-10 bg-white">
        <div class="heading">
          <h2 class="text">📝 회원가입</h2>
        </div>
        <form name="signup" class="form">
          <div class="input-control">
            <label for="email" class="input-label" hidden>이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              class="input-field"
              placeholder="이메일"
              maxlength="30"
              required
            />
          </div>
          <div class="input-control">
            <label for="name" class="input-label" hidden>이름</label>
            <input
              type="text"
              id="name"
              name="name"
              class="input-field"
              placeholder="이름"
              maxlength="20"
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
              maxlength="20"
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
              class="js-password-confirm input-field"
              placeholder="비밀번호 확인"
              required
            />
          </div>
          <p class="js-pw-confirm-message h-2rem"></p>
          <div class="input-control mt-3">
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
            <a href="${PAGE_URLS.LOGIN}" class="js-login-link">로그인</a>
          </p>
        </form>
      </div>
    `;

    this.attachEvent();
  }
}
