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
import { showSnackbar } from '../../utils/snackbar.js';
import { request } from '../../utils/api.js';
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
  REQUEST_METHOD,
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

  _handleSignup(e) {
    e.preventDefault();

    const formData = getFormData(e.target.elements);
    this._requestSignup(formData);
  }

  async _requestSignup(data) {
    try {
      const option = {
        method: REQUEST_METHOD.POST,
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      };

      await request(`${BASE_URL}${ACTIONS.REGISTER}`, option);

      this.#props.switchURL(PATH.LOGIN);
      showSnackbar(SNACKBAR_MESSAGE.SIGNUP);
    } catch ({ status }) {
      alert(SIGNUP_ERROR[status] || ERROR_MESSAGE.SIGNUP_FAILED);
    }
  }
}

export default SignUp;
