import { DOM, MESSAGE, NAME_LENGTH, ROUTE } from '../constants';
import { routeTo, isValidEmail, isValidName, isValidPassword, findInValidInput, userJoinAPI } from '../utils';
import { Component } from '../../@shared/models/Component';

export class UserJoin extends Component {
  constructor() {
    super();
    this.isUniqueEmail = false;
  }

  bindEvent() {
    DOM.USER_JOIN.MAIN.FORM.addEventListener('submit', this.handleSubmit.bind(this));
    DOM.USER_JOIN.MAIN.EMAIL_INPUT.addEventListener('input', this.handleEmailInput.bind(this));
    DOM.USER_JOIN.MAIN.EMAIL_INPUT.addEventListener('focusout', this.handleEmailFocusOut.bind(this));
    DOM.USER_JOIN.MAIN.NAME_INPUT.addEventListener('input', this.handleNameInput.bind(this));
    DOM.USER_JOIN.MAIN.PASSWORD_INPUT.addEventListener('input', this.handlePasswordInput.bind(this));
    DOM.USER_JOIN.MAIN.PASSWORD_CONFIRM_INPUT.addEventListener('input', this.handlePasswordConfirmInput.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.isUniqueEmail) {
      alert(MESSAGE.SIGNUP.OVERLAP_CHECK_REQUIRED);

      return;
    }

    const $$input = {
      $email: DOM.USER_JOIN.MAIN.EMAIL_INPUT,
      $name: DOM.USER_JOIN.MAIN.NAME_INPUT,
      $password: DOM.USER_JOIN.MAIN.PASSWORD_INPUT,
      $passwordConfirm: DOM.USER_JOIN.MAIN.PASSWORD_CONFIRM_INPUT,
    };

    const $input = findInValidInput($$input);

    if ($input) {
      $input.value = '';
      $input.focus();

      return;
    }

    try {
      await userJoinAPI.signUp($$input);
      DOM.USER_JOIN.MAIN.FORM.reset();
      routeTo(ROUTE.SIGNIN);
    } catch (error) {
      alert(MESSAGE.RETRY);
    }
  }

  handleEmailInput({ target: { value } }) {
    this.isUniqueEmail = false;

    if (!isValidEmail(value)) {
      DOM.USER_JOIN.MAIN.EMAIL_MSG.classList.replace('text-green', 'text-red');
      DOM.USER_JOIN.MAIN.EMAIL_MSG.innerText = MESSAGE.SIGNUP.INVALID_EMAIL;

      return;
    }

    DOM.USER_JOIN.MAIN.EMAIL_MSG.innerText = '';
  }

  handleNameInput({ target: { value } }) {
    isValidName(value, NAME_LENGTH.USER_MIN, NAME_LENGTH.USER_MAX) //
      ? DOM.USER_JOIN.MAIN.NAME_MSG.classList.add('hidden')
      : DOM.USER_JOIN.MAIN.NAME_MSG.classList.remove('hidden');
  }

  handlePasswordInput({ target: { value } }) {
    isValidPassword(value) //
      ? DOM.USER_JOIN.MAIN.PASSWORD_MSG.classList.add('hidden')
      : DOM.USER_JOIN.MAIN.PASSWORD_MSG.classList.remove('hidden');

    value === DOM.USER_JOIN.MAIN.PASSWORD_CONFIRM_INPUT.value || DOM.USER_JOIN.MAIN.PASSWORD_CONFIRM_INPUT.value === ''
      ? DOM.USER_JOIN.MAIN.PASSWORD_CONFIRM_MSG.classList.add('hidden')
      : DOM.USER_JOIN.MAIN.PASSWORD_CONFIRM_MSG.classList.remove('hidden');
  }

  handlePasswordConfirmInput({ target: { value } }) {
    value === DOM.USER_JOIN.MAIN.PASSWORD_INPUT.value
      ? DOM.USER_JOIN.MAIN.PASSWORD_CONFIRM_MSG.classList.add('hidden')
      : DOM.USER_JOIN.MAIN.PASSWORD_CONFIRM_MSG.classList.remove('hidden');
  }

  async handleEmailFocusOut({ target: { value: email } }) {
    if (!isValidEmail(email)) return;

    try {
      await userJoinAPI.checkOverlappedEmail(email);
      this.isUniqueEmail = true;
      DOM.USER_JOIN.MAIN.EMAIL_MSG.innerText = MESSAGE.SIGNUP.UNIQUE_EMAIL;
      DOM.USER_JOIN.MAIN.EMAIL_MSG.classList.replace('text-red', 'text-green');
    } catch (error) {
      DOM.USER_JOIN.MAIN.EMAIL_MSG.innerText =
        error.message === '422' ? MESSAGE.SIGNUP.OVERLAPPED_EMAIL : MESSAGE.RETRY;
      DOM.USER_JOIN.MAIN.EMAIL_MSG.classList.replace('text-green', 'text-red');
    }
  }
}
