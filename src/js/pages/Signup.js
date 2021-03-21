import { $ } from '../utils/DOM.js';
import { fetchSignup, fetchToCheckDuplicatedEmail } from '../API/auth.js';
import { HTTP, MESSAGE, REG_EXP } from '../constants.js';
import signupTemplate from '../templates/signup.js';

class SignupPage {
  constructor(router) {
    this.$main = $('#main');
    this.isPossibleSignup = false;
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    this.$main.innerHTML = signupTemplate;
  }

  showFailMessage(e, messageTarget) {
    const inputControl = e.target.closest('.js-input-control');

    inputControl.classList.add('fail');
    inputControl.classList.remove('success');
    $(messageTarget).classList.remove('d-none');

    this.isPossibleSignup = false;
  }

  hideFailMessage(e, messageTarget) {
    const inputControl = e.target.closest('.js-input-control');

    inputControl.classList.remove('fail');
    inputControl.classList.add('success');
    $(messageTarget).classList.add('d-none');

    this.isPossibleSignup = true;
  }

  checkEmailInputHandler(e) {
    $('#email-fail-message').innerText = MESSAGE.ERROR.WRONG_EMAIL_FORMAT;

    if (!REG_EXP.EMAIL.test(e.target.value)) {
      this.showFailMessage(e, '#email-fail-message');
    } else {
      this.hideFailMessage(e, '#email-fail-message');
    }
  }

  checkNameInputHandler(e) {
    if (e.target.value === '' || REG_EXP.NAME.test(e.target.value)) {
      this.showFailMessage(e, '#name-fail-message');
    } else {
      this.hideFailMessage(e, '#name-fail-message');
    }
  }

  checkPasswordInputHandler(e) {
    console.log(e.target.value);
    if (!REG_EXP.PASSWORD.test(e.target.value)) {
      this.showFailMessage(e, '#password-fail-message');
    } else {
      this.hideFailMessage(e, '#password-fail-message');
    }
  }

  checkPasswordConfirmInputHandler(e) {
    if ($('#password').value !== e.target.value) {
      this.showFailMessage(e, '#password-confirm-fail-message');
    } else {
      this.hideFailMessage(e, '#password-confirm-fail-message');
    }
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

        this.isPossibleSignup = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async signupHandler(e) {
    e.preventDefault();

    const requestData = this.makeRequestData(e);

    if (this.isPossibleSignup) {
      await this.requestSignup(requestData);
    }
  }

  bindCheckInputEvents() {
    $('#email').addEventListener(
      'keyup',
      this.checkEmailInputHandler.bind(this)
    );

    $('#name').addEventListener('keyup', this.checkNameInputHandler.bind(this));

    $('#password').addEventListener(
      'keyup',
      this.checkPasswordInputHandler.bind(this)
    );

    $('#password-confirm').addEventListener(
      'keyup',
      this.checkPasswordConfirmInputHandler.bind(this)
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
