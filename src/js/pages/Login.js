import { $ } from '../utils/DOM.js';
import { COOKIE_KEY, HTTP } from '../constants.js';
import { fetchLogin } from '../API/auth.js';
import jwtToken from '../jwtToken.js';
import loginTemplate from '../templates/login.js';
import {
  checkEmailInputHandler,
  checkPasswordInputHandler,
} from '../authHandlers.js';

class LoginPage {
  constructor(router) {
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    this.$main.innerHTML = loginTemplate;
  }

  async loginHandler(e) {
    const request = {
      method: HTTP.METHOD.POST,
      body: JSON.stringify({
        [HTTP.BODY.KEY.EMAIL]: e.target.elements['email'].value,
        [HTTP.BODY.KEY.PASSWORD]: e.target.elements['password'].value,
      }),
      headers: {
        [HTTP.HEADERS.KEY
          .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
      },
    };

    try {
      const response = await fetchLogin(request);

      if (!response.ok) {
        throw '아이디와 비밀번호를 확인해주세요.';
      }

      const { accessToken } = await response.json();
      jwtToken.setToken(COOKIE_KEY.JWT_TOKEN, accessToken);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      this.router.navigate('/');
    }
  }

  bindCheckInputEvents() {
    $('#email').addEventListener('keyup', checkEmailInputHandler.bind(this));
    $('#password').addEventListener(
      'keyup',
      checkPasswordInputHandler.bind(this)
    );
  }

  bindEvents() {
    this.bindCheckInputEvents();

    $('#login-form').addEventListener('submit', this.loginHandler.bind(this));
    $('#signup').addEventListener('click', e => {
      e.preventDefault();

      const path = e.target.getAttribute('href');
      this.router.navigate(path);
    });
  }
}

export default LoginPage;
