import { checkSignupValid } from './signupValidator.js';
import { signUpTemplate } from './signupTemplate.js';
import { $, getFormData } from '../../utils/dom.js';
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
    this._bindSubmitEvent();
  }

  _bindSubmitEvent() {
    const $signUpForm = $(SELECTOR.SIGNUP_FORM);

    $signUpForm.addEventListener('submit', e => {
      e.preventDefault();

      this._handleSignup(e.target.elements);
    });
  }

  _handleSignup(elements) {
    const formData = getFormData(elements);

    const errorMessage = checkSignupValid(formData);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

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
