import { $ } from '../utils/DOM.js';
import { fetchSignup, fetchToCheckDuplicatedEmail } from '../API/auth.js';
import { HTTP, MESSAGE, SNACKBAR_MESSAGE } from '../constants.js';
import signupTemplate from '../templates/signup.js';
import {
  checkEmailInputHandler,
  checkNameInputHandler,
  checkPasswordConfirmInputHandler,
  checkPasswordInputHandler,
} from '../authHandlers.js';
import showSnackBar from '../utils/snackbar.js';

class SignupPage {
  constructor(router) {
    this.router = router;
    this.isCheckedEmail = false;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    $('#main').innerHTML = signupTemplate;
  }

  async requestSignup(request) {
    try {
      const response = await fetchSignup(request);

      if (!response.ok) {
        throw MESSAGE.ERROR.FAIL_TO_SIGNUP;
      }

      showSnackBar(SNACKBAR_MESSAGE.SUCCESS.SIGNUP);
      this.router.navigate('/');
    } catch (error) {
      console.error(error);
      alert(error);

      this.router.navigate('/signup');
    }
  }

  async checkDuplicatedEmailHandler() {
    if (!$('#email-input').classList.contains('success')) return;

    try {
      const email = $('#email').value;
      const response = await fetchToCheckDuplicatedEmail(email);

      if (!response.ok) {
        $('#email-input').classList.remove('success');
        $('#email-input').classList.add('fail');
        $('#email-form-message').innerText = MESSAGE.ERROR.DUPLICATED_EMAIL;
      }

      this.isCheckedEmail = true;
      $('#email-form-message').innerText = MESSAGE.SUCCESS.AVAILABLE_EMAIL;
      $('#email-form-message').classList.remove('d-none');
    } catch (error) {
      console.error(error);
    }
  }

  async signupHandler(e) {
    e.preventDefault();
    if (!this.isCheckedEmail) {
      alert(MESSAGE.ERROR.NOT_CHECKED_EMAIL);
      return;
    }

    const signupData = {
      email: e.target.elements['email'].value,
      name: e.target.elements['name'].value,
      password: e.target.elements['password'].value,
    };

    await this.requestSignup(signupData);
  }

  bindCheckInputEvents() {
    $('#email').addEventListener('keyup', e => {
      this.isCheckedEmail = false;
      checkEmailInputHandler(e);
    });
    $('#name').addEventListener('keyup', checkNameInputHandler);
    $('#password').addEventListener('keyup', checkPasswordInputHandler);
    $('#password-confirm').addEventListener(
      'keyup',
      checkPasswordConfirmInputHandler
    );
  }

  bindEvents() {
    this.bindCheckInputEvents();

    $('#check-duplicated-email-button').addEventListener(
      'click',
      this.checkDuplicatedEmailHandler.bind(this)
    );
    $('#signup-form').addEventListener('submit', this.signupHandler.bind(this));

    $('#login').addEventListener('click', e => {
      e.preventDefault();

      this.router.navigate('/');
    });
  }
}
export default SignupPage;
