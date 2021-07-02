import Cookies from 'js-cookie';

import { fetchLogin } from '../../API/auth.js';

import user from '../../models/user.js';
import loginTemplate from './loginTemplate.js';

import router from '../../router.js';

import { $ } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';

import { MESSAGE, SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import { PATH } from '../../constants/path.js';

class LoginPage {
  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    $('#app-navbar').innerHTML = '';
    $('#navigation').innerHTML = '';
    $('#main').innerHTML = loginTemplate;
  }

  bindEvents() {
    $('#login-form').addEventListener('submit', this.loginHandler.bind(this));
    $('#signup').addEventListener('click', e => {
      e.preventDefault();

      router.navigate(PATH.SIGNUP);
    });
  }

  async loginHandler(e) {
    e.preventDefault();

    const loginData = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    await this.requestLogin(loginData);
  }

  async requestLogin(request) {
    try {
      const response = await fetchLogin(request);

      if (!response.ok) {
        throw MESSAGE.ERROR.CHECK_EMAIL_AND_PASSWORD;
      }

      const { accessToken } = await response.json();

      Cookies.set(COOKIE_KEY.JWT_TOKEN, accessToken);
      user.setAuthorization();

      showSnackBar(SNACKBAR_MESSAGE.SUCCESS.LOGIN);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      router.navigate(PATH.ROOT);
    }
  }
}

export default LoginPage;
