import { $ } from '../utils/DOM.js';
import { fetchSignup, fetchToCheckDuplicatedEmail } from '../API/auth.js';
import { HTTP, MESSAGE } from '../constants.js';
import signupTemplate from '../templates/signup.js';
import {
  checkEmailInputHandler,
  checkNameInputHandler,
  checkPasswordConfirmInputHandler,
  checkPasswordInputHandler,
} from '../authHandlers.js';

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

  async requestSignup(request) {
    try {
      const response = await fetchSignup(request);

      if (!response.ok) {
        throw MESSAGE.ERROR.FAIL_TO_SIGNUP;
      }

      this.router.navigate('/');
    } catch (error) {
      console.error(error);
      alert(error);

      this.router.navigate('/signup');
    }
  }

  makeRequestData(e) {
    return {
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
  }

  async checkDuplicatedEmailHandler() {
    if (!$('#email-input').classList.contains('success')) return;

    try {
      const email = $('#email').value;
      const response = await fetchToCheckDuplicatedEmail(email);

      if (!response.ok) {
        $('#email-input').classList.remove('success');
        $('#email-input').classList.add('fail');
        $('#email-fail-message').innerText = MESSAGE.ERROR.DUPLICATED_EMAIL;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async signupHandler(e) {
    e.preventDefault();

    const requestData = this.makeRequestData(e);
    await this.requestSignup(requestData);
  }

  bindCheckInputEvents() {
    $('#email').addEventListener('keyup', checkEmailInputHandler.bind(this));
    $('#name').addEventListener('keyup', checkNameInputHandler.bind(this));
    $('#password').addEventListener(
      'keyup',
      checkPasswordInputHandler.bind(this)
    );
    $('#password-confirm').addEventListener(
      'keyup',
      checkPasswordConfirmInputHandler.bind(this)
    );
  }

  bindEvents() {
    this.bindCheckInputEvents();
    $('#check-duplicated-email-button').addEventListener(
      'click',
      this.checkDuplicatedEmailHandler.bind(this)
    );
    $('#signup-form').addEventListener('submit', this.signupHandler.bind(this));
    $('#login').addEventListener('click', () => {
      this.router.navigate('/');
    });
  }
}
export default SignupPage;
