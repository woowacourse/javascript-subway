import { $ } from '../utils/DOM.js';
import { MESSAGE, COOKIE_KEY, HTTP } from '../constants.js';
import { fetchLogin } from '../API/auth.js';
import jwtToken from '../jwtToken.js';
import loginTemplate from '../templates/login.js';
import {
  checkEmailInputHandler,
  checkPasswordInputHandler,
} from '../authHandlers.js';

class LoginPage {
  constructor(router) {
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    $('#main').innerHTML = loginTemplate;
  }

  async requestLogin(request) {
    try {
      const response = await fetchLogin(request);

      if (!response.ok) {
        throw MESSAGE.ERROR.CHECK_EMAIL_AND_PASSWORD;
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

  makeRequestData(e) {
    return {
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
  }

  async loginHandler(e) {
    e.preventDefault();

    const requestData = this.makeRequestData(e);
    await this.requestLogin(requestData);
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

      this.router.navigate('/signup');
    });
  }
}

export default LoginPage;
