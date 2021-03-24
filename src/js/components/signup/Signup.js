import {
  checkNameValid,
  checkEmailValid,
  checkPasswordValid,
  checkPasswordConfirmValid,
} from './signupValidator.js';
import { signUpTemplate } from './signupTemplate.js';
import { $, $$, getFormData, showValidMessage } from '../../utils/dom.js';
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
    switch (id) {
      case FORM.SIGNUP.NAME:
        this.$message = $(SELECTOR.NAME_MESSAGE);
        this.checkedResult = checkNameValid(value);
        break;
      case FORM.SIGNUP.EMAIL:
        this.$message = $(SELECTOR.EMAIL_MESSAGE);
        this.checkedResult = await checkEmailValid(value);
        break;
      case FORM.SIGNUP.PASSWORD:
        this.$message = $(SELECTOR.PASSWORD_MESSAGE);
        this.checkedResult = checkPasswordValid(value);
      case FORM.SIGNUP.PASSWORD:
      case FORM.SIGNUP.PASSWORD_CONFIRM:
        const password = $(SELECTOR.PASSWORD).value;
        const passwordConfirm = $(SELECTOR.PASSWORD_CONFIRM).value;
        this.$message = $(SELECTOR.PASSWORD_CONFIRM_MESSAGE);
        this.checkedResult = checkPasswordConfirmValid(
          password,
          passwordConfirm,
        );
        break;

      default:
    }

    showValidMessage(this.$message, this.checkedResult);
    // TODO : 아래 상수화, util화
    const submitButton = $("form[name='signup'] .input-submit");

    submitButton.disabled = ![...$$('.message')].every(element =>
      element.classList.contains('valid'),
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
