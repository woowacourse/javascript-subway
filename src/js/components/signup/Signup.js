import {
  checkNameValid,
  checkEmailValid,
  checkPasswordValid,
  checkPasswordConfirmValid,
} from './signupValidator.js';
import { signUpTemplate } from './signupTemplate.js';

import { authAPI } from '../../../../api/auth.js';
import { showSnackbar } from '../../utils/snackbar.js';
import {
  $,
  $$,
  getFormData,
  isAllElementsHaveClass,
  showValidMessage,
} from '../../utils/dom.js';
import {
  PAGE_TITLE,
  SELECTOR,
  PATH,
  SUCCESS_MESSAGE,
  SIGNUP_ERROR,
  ERROR_MESSAGE,
  FORM,
  CLASS_NAME,
  TIME,
} from '../../constants.js';

class SignUp {
  #props;

  constructor(props) {
    this.#props = props;
  }

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
      }, TIME.DEBOUNCE);
    });
  }

  _bindSubmitEvent() {
    this.$signUpForm.addEventListener('submit', e => {
      this._handleSignup(e);
    });
  }

  async _handleValidMessage({ id, value }) {
    switch (id) {
      case FORM.SIGNUP.NAME:
        showValidMessage($(SELECTOR.NAME_MESSAGE), checkNameValid(value));
        break;

      case FORM.SIGNUP.EMAIL:
        showValidMessage(
          $(SELECTOR.EMAIL_MESSAGE),
          await checkEmailValid(value),
        );
        break;

      case FORM.SIGNUP.PASSWORD:
      case FORM.SIGNUP.PASSWORD_CONFIRM:
        const password = $(SELECTOR.PASSWORD).value;
        const passwordConfirm = $(SELECTOR.PASSWORD_CONFIRM).value;

        showValidMessage(
          $(SELECTOR.PASSWORD_MESSAGE),
          checkPasswordValid(password),
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

  async _handleSignup(e) {
    e.preventDefault();

    try {
      const formData = getFormData(e.target.elements);
      await authAPI.signup(formData);

      this.#props.switchURL(PATH.LOGIN);
      showSnackbar(SUCCESS_MESSAGE.SIGNUP);
    } catch ({ status }) {
      alert(SIGNUP_ERROR[status] || ERROR_MESSAGE.SIGNUP_FAILED);
    }
  }
}

export default SignUp;
