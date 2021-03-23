import Component from "./common/Component.js";

import { checkDuplicatedEmailAPI, signupAPI } from "../APIs/subwayAPI.js";

import { $, $$, changeCheckMessageColor } from "../utils/DOM.js";
import snackbar from "../utils/snackbar.js";

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";
import PAGE_URLS from "../constants/pages.js";
import { PASSWORD_MIN_LENGTH, EMAIL_REG_EXP } from "../constants/general.js";

export default class SignupForm extends Component {
  constructor({ $parent, pageRouter }) {
    super($parent);

    this.pageRouter = pageRouter;
    this.email = "";
    this.inputValidation = {
      isValidEmail: false,
      isPasswordConfirmed: false,
    };

    this.initContent();
  }

  initContent() {
    const template = `
      <div class="wrapper p-10 bg-white">
        <div class="heading">
          <h2 class="text">📝 회원가입</h2>
        </div>
        <form name="signup" class="form">
          <div class="input-control flex-wrap">
            <label for="email" class="input-label" hidden>이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              class="js-email-input input-field"
              placeholder="이메일"
              maxlength="30"
              required
            />
            <p class="js-message js-check-email-message text-sm mt-1 mb-0 ml-4"></p>
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
            <label for="password" class="input-label" hidden>비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              class="js-password input-field"
              placeholder="비밀번호(최소 ${PASSWORD_MIN_LENGTH}자리)"
              minlength="${PASSWORD_MIN_LENGTH}"
              maxlength="20"
              required
            />
          </div>
          <div class="input-control flex-wrap">
            <label for="password-confirm" class="input-label" hidden>비밀번호 확인</label>
            <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              class="js-password-confirm input-field"
              placeholder="비밀번호 확인"
              required
            />
            <p class="js-message js-pw-confirm-message h-2rem text-sm mt-1 mb-0 ml-4"></p>
          </div>
          <div class="input-control mt-8">
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

    super.initContent(template);
    this.attachEvent();
  }

  attachEvent() {
    $("form", this.innerElement).addEventListener(
      "submit",
      this.onSubmitSignupForm.bind(this)
    );
    $(".js-email-input", this.innerElement).addEventListener(
      "change",
      this.onChangeEmail.bind(this)
    );
    $(".js-password", this.innerElement).addEventListener(
      "input",
      this.onTypePassword.bind(this)
    );
    $(".js-password-confirm", this.innerElement).addEventListener(
      "input",
      this.onTypePassword.bind(this)
    );
    $(".js-login-link", this.innerElement).addEventListener(
      "click",
      this.onClickLoginLink.bind(this)
    );
  }

  getFormValidationMessage($form) {
    if (!this.inputValidation.isValidEmail) {
      return ERROR_MESSAGE.INVALID_EMAIL;
    }

    if (!this.inputValidation.isPasswordConfirmed) {
      return ERROR_MESSAGE.NOT_CONFIRMED_PASSWORD;
    }

    if ($form.name === "") {
      return ERROR_MESSAGE.EMPTY_NAME;
    }

    if ($form.password.length < PASSWORD_MIN_LENGTH) {
      return ERROR_MESSAGE.INVALID_PASSWORD;
    }

    return "";
  }

  async signup(memberData) {
    try {
      const response = await signupAPI(memberData);

      if (!response.ok) {
        window.alert(ERROR_MESSAGE.SIGNUP_FAILURE);

        return;
      }

      this.pageRouter.movePage(PAGE_URLS.LOGIN);
      snackbar.show(SUCCESS_MESSAGE.SIGNUP_SUCCESS);
    } catch (e) {
      console.error(e);
      window.alert(ERROR_MESSAGE.API_CALL_FAILURE);
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

    if (this.email !== memberData.email) {
      await this.checkEmail(memberData.email);
    }

    const formValidationMessage = this.getFormValidationMessage(target);
    if (formValidationMessage === "") {
      this.signup(memberData);
    } else {
      window.alert(formValidationMessage);
    }
  }

  async checkEmail(email) {
    const $checkEmailMessage = $(".js-check-email-message", this.$parent);

    try {
      const response = await checkDuplicatedEmailAPI(email);

      if (response.status === 200) {
        changeCheckMessageColor($checkEmailMessage, true);
        $checkEmailMessage.textContent = SUCCESS_MESSAGE.VALID_EMAIL;
        this.inputValidation.isValidEmail = true;
        this.email = email;

        return;
      }

      if (response.status === 422) {
        changeCheckMessageColor($checkEmailMessage, false);
        $checkEmailMessage.textContent = ERROR_MESSAGE.DUPLICATED_EMAIL;
        this.inputValidation.isValidEmail = false;

        return;
      }

      throw new Error(response.status);
    } catch (e) {
      console.error(e);

      changeCheckMessageColor($checkEmailMessage, false);
      $checkEmailMessage.textContent = "api error";
      this.inputValidation.isValidEmail = false;
    }
  }

  onChangeEmail({ target }) {
    const emailInput = target.value;
    const $checkEmailMessage = $(".js-check-email-message", this.$parent);

    if (EMAIL_REG_EXP.test(emailInput)) {
      this.checkEmail(emailInput);
    } else {
      changeCheckMessageColor($checkEmailMessage, false);
      $checkEmailMessage.textContent = ERROR_MESSAGE.INVALID_EMAIL_FORM;
      this.inputValidation.isValidEmail = false;
    }
  }

  onTypePassword() {
    const $form = $("form", this.$parent);
    const $messageArea = $(".js-pw-confirm-message", this.$parent);

    if ($form.elements["password-confirm"].value === $form.password.value) {
      $messageArea.innerText = SUCCESS_MESSAGE.PASSWORD_CONFIRM_SUCCESS;
      changeCheckMessageColor($messageArea, true);
      this.inputValidation.isPasswordConfirmed = true;
    } else {
      $messageArea.innerText = ERROR_MESSAGE.PASSWORD_CONFIRM_FAILURE;
      changeCheckMessageColor($messageArea, false);
      this.inputValidation.isPasswordConfirmed = false;
    }
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
    $("form", this.innerElement).reset();
    $$(".js-message", this.innerElement).forEach(($ele) => {
      // eslint-disable-next-line no-param-reassign
      $ele.textContent = "";
    });
    super.render();
  }
}
