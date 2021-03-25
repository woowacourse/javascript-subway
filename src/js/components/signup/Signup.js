import {
  checkNameValid,
  checkEmailValid,
  checkPasswordValid,
  checkPasswordConfirmValid,
} from './signupValidator.js';
import { signUpTemplate } from './signupTemplate.js';
import {
  $,
  $$,
  getFormData,
  isAllElementsHaveClass,
  showValidMessage,
} from '../../utils/dom.js';
import { request, getPostOption } from '../../utils/api.js';
import {
  BASE_URL,
  ACTIONS,
  PAGE_TITLE,
  SELECTOR,
  PATH,
  SNACKBAR_MESSAGE,
  SIGNUP_ERROR,
  ERROR_MESSAGE,
  FORM,
  CLASS_NAME,
} from '../../constants.js';

class SignUp {
  #props;

  constructor(props) {
    this.#props = props;
  }

  init() {}

  getPageInfo() {
    return {
      title: PAGE_TITLE.SIGNUP,
      contents: {
        main: signUpTemplate(),
      },
    };
  }

  initDOM() {
    this.$signUpForm = $(SELECTOR.SIGNUP_FORM);
    this.$submitButton = $(SELECTOR.SIGNUP_FORM_SUBMIT);
    this._bindEvent();
  }

  _bindEvent() {
    this._bindInputEvent();
    this._bindSubmitEvent();
  }

  _bindInputEvent() {
    let debounce = null;

    this.$signUpForm.addEventListener('input', ({ target }) => {
      if (target.tagName !== 'INPUT') return;
      if (debounce) {
        clearTimeout(debounce);
      }

      debounce = setTimeout(() => {
        this._handleValidMessage(target);
      }, 500);
    });
  }

  _bindSubmitEvent() {
    this.$signUpForm.addEventListener('submit', e => {
      e.preventDefault();

      this._handleSignup(e.target.elements);
    });
  }

  async _handleValidMessage({ id, value }) {
    switch (true) {
      case id === FORM.SIGNUP.NAME:
        showValidMessage($(SELECTOR.NAME_MESSAGE), checkNameValid(value));
        break;

      case id === FORM.SIGNUP.EMAIL:
        showValidMessage(
          $(SELECTOR.EMAIL_MESSAGE),
          await checkEmailValid(value),
        );
        break;

      case id === FORM.SIGNUP.PASSWORD || id === FORM.SIGNUP.PASSWORD_CONFIRM:
        const password = $(SELECTOR.PASSWORD).value;
        const passwordConfirm = $(SELECTOR.PASSWORD_CONFIRM).value;

        showValidMessage(
          $(SELECTOR.PASSWORD_MESSAGE),
          checkPasswordValid(value),
        );

        showValidMessage(
          $(SELECTOR.PASSWORD_CONFIRM_MESSAGE),
          checkPasswordConfirmValid(password, passwordConfirm),
        );
        break;

      default:
    }

    this.$submitButton.disabled = !isAllElementsHaveClass(
      $$(SELECTOR.MESSAGE),
      CLASS_NAME.VALID,
    );
  }

  _handleSignup(elements) {
    const formData = getFormData(elements);

    this._requestSignup(formData);
  }

  async _requestSignup(data) {
    try {
      const requestBody = JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      const option = getPostOption(requestBody);

      await request(BASE_URL + ACTIONS.REGISTER, option);

      this.#props.switchURL(PATH.LOGIN);
      this.#props.showSnackbar(SNACKBAR_MESSAGE.SIGNUP);
    } catch (error) {
      alert(SIGNUP_ERROR[error] || ERROR_MESSAGE.SIGNUP_FAILED);
    }
  }
}

export default SignUp;
