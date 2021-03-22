import { $, getFormData } from '../../utils/dom.js';
import { request, getPostOption } from '../../utils/api.js';
import {
  BASE_URL,
  ACTIONS,
  SNACKBAR_MESSAGE,
  PATH,
  SELECTOR,
  CLASS_NAME,
  ERROR_MESSAGE,
  PAGE_TITLE,
  LOGIN_ERROR,
  STORAGE,
} from '../../constants.js';
import { checkLoginValid } from './loginValidator.js';
import { setLocalStorageItem } from '../../utils/storage.js';
import { loginTemplate } from './loginTemplate.js';

class Login {
  #props;

  constructor(props) {
    this.#props = props;
  }

  init() {}

  getPageInfo() {
    return {
      title: PAGE_TITLE.LOGIN,
      contents: {
        main: loginTemplate(),
      },
    };
  }

  initDOM() {
    this._selectDOM();
    this._bindEvent();
  }

  _selectDOM() {
    this.$loginForm = $(SELECTOR.LOGIN_FORM);
  }

  _bindEvent() {
    this._bindSignUpEvent();
    this._bindLoginEvent();
  }

  _bindSignUpEvent() {
    this.$loginForm.addEventListener('click', e => {
      if (!e.target.classList.contains(CLASS_NAME.SIGNUP_LINK)) return;
      e.preventDefault();
      this.#props.switchURL(PATH.SIGNUP);
    });
  }

  _bindLoginEvent() {
    this.$loginForm.addEventListener('submit', e => {
      e.preventDefault();

      this._handleLogin(e.target.elements);
    });
  }

  _handleLogin(elements) {
    const formData = getFormData(elements);

    const errorMessage = checkLoginValid(formData);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    this._requestLogin(formData);
  }

  async _requestLogin(data) {
    try {
      const requestBody = JSON.stringify({
        email: data.email,
        password: data.password,
      });
      const option = getPostOption(requestBody);
      const { accessToken } = await request(BASE_URL + ACTIONS.LOGIN, option);

      setLocalStorageItem(STORAGE.USER_ACCESS_TOKEN, accessToken);

      this.#props.switchURL(PATH.HOME);
      this.#props.showSnackbar(SNACKBAR_MESSAGE.LOGIN);
    } catch (error) {
      alert(LOGIN_ERROR[error] || ERROR_MESSAGE.LOGIN_FAILED);
    }
  }
}

export default Login;
