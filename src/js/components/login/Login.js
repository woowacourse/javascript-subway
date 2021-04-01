import { checkLoginValid } from './loginValidator.js';
import { loginTemplate } from './loginTemplate.js';

import { authAPI } from '../../../../api/auth.js';
import { showSnackbar } from '../../utils/snackbar.js';
import { $, getFormData } from '../../utils/dom.js';
import { setLocalStorageItem } from '../../utils/storage.js';
import {
  SUCCESS_MESSAGE,
  PATH,
  SELECTOR,
  CLASS_NAME,
  ERROR_MESSAGE,
  PAGE_TITLE,
  LOGIN_ERROR,
  STORAGE,
} from '../../constants.js';

class Login {
  #props;

  constructor(props) {
    this.#props = props;
  }

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

      this._handleRouteSignup(e);
    });
  }

  _bindLoginEvent() {
    this.$loginForm.addEventListener('submit', e => {
      this._handleLogin(e);
    });
  }

  _handleRouteSignup(e) {
    e.preventDefault();
    this.#props.switchURL(PATH.SIGNUP);
  }

  async _handleLogin(e) {
    e.preventDefault();

    const formData = getFormData(e.target.elements);
    const errorMessage = checkLoginValid(formData);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const accessToken = await authAPI.login(formData);
      setLocalStorageItem(STORAGE.USER_ACCESS_TOKEN, accessToken);

      this.#props.switchURL(PATH.HOME);
      showSnackbar(SUCCESS_MESSAGE.LOGIN);
    } catch ({ status }) {
      alert(LOGIN_ERROR[status] || ERROR_MESSAGE.LOGIN_FAILED);
    }
  }
}

export default Login;
