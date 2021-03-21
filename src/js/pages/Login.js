import { $ } from '../utils/DOM.js';
import { HTTP } from '../constants.js';
import { fetchLogin } from '../API/auth.js';
import jwtToken from '../jwtToken.js';
import loginTemplate from '../templates/login.js';

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
    e.preventDefault();

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
      jwtToken.setToken(accessToken);

      //TODO : 로그인 성공했을 때, snackBar 만들기
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      console.log('finally');
      this.router.navigate('/');
    }
  }

  bindEvents() {
    $('#signup').addEventListener('click', e => {
      e.preventDefault();

      const path = e.target.getAttribute('href');
      this.router.navigate(path);
    });

    $('#login-form').addEventListener('submit', this.loginHandler.bind(this));
  }
}

export default LoginPage;
