import { $ } from '../utils/DOM.js';
import { fetchSignup } from '../API/auth.js';
import { HTTP } from '../constants.js';
import signupTemplate from '../templates/signup.js';

class SignupPage {
  constructor(router) {
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    this.$main.innerHTML = signupTemplate;
  }

  async signupHandler(e) {
    e.preventDefault();

    if (
      e.target.elements['password'].value !==
      e.target.elements['password-confirm'].value
    ) {
      alert('비밀번호 다름');
      return;
    }

    const request = {
      method: HTTP.METHOD.POST,
      body: JSON.stringify({
        [HTTP.BODY.KEY.EMAIL]: e.target.elements['email'].value,
        [HTTP.BODY.KEY.NAME]: e.target.elements['name'].value,
        [HTTP.BODY.KEY.PASSWORD]: e.target.elements['password'].value,
      }),
      headers: {
        [HTTP.HEADERS.KEY
          .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
      },
    };

    try {
      const response = await fetchSignup(request);

      if (!response.ok) {
        throw '회원가입에 실패 하셨습니다. 다시 시도 해주세요.';
      }

      this.router.navigate('/');
    } catch (error) {
      console.error(error);
      alert(error);

      this.router.navigate('/signup');
    }
  }

  bindEvents() {
    $('#signup-form').addEventListener('submit', this.signupHandler.bind(this));
  }
}
export default SignupPage;
