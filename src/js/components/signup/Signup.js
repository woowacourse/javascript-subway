import Component from '../../core/Component.js';
import { signupTemplate } from './template.js';
import {
  $,
  showSnackbar,
  API,
  setFontColorGreen,
  setFontColorRed,
} from '../../utils/index.js';
import { SNACKBAR_MESSAGE } from '../../constants/index.js';
import Navigation from '../navigation/Navigation.js';

export default class Signup extends Component {
  constructor({ changeTemplate }) {
    super();
    this.changeTemplate = changeTemplate;
    this.isDuplicateChecked;
  }

  bindEvent() {
    $('#signup-form').addEventListener(
      'submit',
      this.handleSignupForm.bind(this),
    );
    $('#check-email-duplicate-button').addEventListener(
      'click',
      this.handleEmailDuplicateButton.bind(this),
    );
    $('#signup-password-confirm').addEventListener(
      'keyup',
      this.handlePasswordConfirm.bind(this),
    );
  }

  async handleEmailDuplicateButton() {
    const email = $('#signup-email').value;
    const $emailValidCheckText = $('#email-valid-check-text');

    try {
      await API.checkDuplicateEmail(email);

      setFontColorGreen($emailValidCheckText);
      $emailValidCheckText.innerText = SNACKBAR_MESSAGE.IS_NOT_DUPLICATE_EMAIL;
      showSnackbar(SNACKBAR_MESSAGE.IS_NOT_DUPLICATE_EMAIL);
      this.isDuplicateChecked = email;
    } catch {
      setFontColorRed($emailValidCheckText);
      $emailValidCheckText.innerText = SNACKBAR_MESSAGE.IS_DUPLICATE_EMAIL;
      showSnackbar(SNACKBAR_MESSAGE.IS_DUPLICATE_EMAIL);
      this.isDuplicateChecked = false;
    }
  }

  async handleSignupForm(e) {
    e.preventDefault();

    const name = e.target.elements['signup-name'].value;
    const email = e.target.elements['signup-email'].value;
    const password = e.target.elements['signup-password'].value;
    const confirmPassword = e.target.elements['signup-password-confirm'].value;

    if (password !== confirmPassword) {
      showSnackbar(SNACKBAR_MESSAGE.NOT_MATCH_CONFIRM_PASSWORD);
      return;
    }

    if (!this.isDuplicateChecked || this.isDuplicateChecked !== email) {
      showSnackbar(SNACKBAR_MESSAGE.REQUIRE_CHECK_EMAIL);
      return;
    }

    try {
      await API.signup({ email, password, name });

      showSnackbar(SNACKBAR_MESSAGE.SIGNUP_SUCCESS);
      this.changeTemplate('/login');
      history.pushState({ pathName: '/login' }, null, '/login');
      Navigation.changeSelectedButtonColor();
      this.isDuplicateChecked = false;
    } catch {
      showSnackbar(SNACKBAR_MESSAGE.SIGNUP_FAILURE);
    }
  }

  handlePasswordConfirm({ target }) {
    const password = $('#signup-password').value;
    const confirmPassword = target.value;
    const $passwordMatchCheckText = $('#password-match-check-text');

    if (password !== confirmPassword) {
      setFontColorRed($passwordMatchCheckText);
      $passwordMatchCheckText.innerText =
        SNACKBAR_MESSAGE.NOT_MATCH_CONFIRM_PASSWORD;
      return;
    }

    setFontColorGreen($passwordMatchCheckText);
    $passwordMatchCheckText.innerText = SNACKBAR_MESSAGE.MATCH_CONFIRM_PASSWORD;
  }

  render() {
    $('main').innerHTML = signupTemplate();
  }

  load() {
    this.render();
    this.bindEvent();
  }
}
