import { contentElements } from '../views';
import { $, encrypt, request } from '../../@shared/utils';
import { BASE_URL, MESSAGE, ROUTE } from '../constants/constants';
import { routeTo, isValidEmail, isValidName, isValidPassword, findInValidInput } from '../utils';

export class UserJoin {
  constructor() {
    this.$target = contentElements[ROUTE.SIGNUP];
    this.isUniqueEmail = false;
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$signUpForm = $('#signup-form', this.$target);
    this.$$input = {
      $email: $('#signup-email', this.$target),
      $password: $('#signup-password', this.$target),
      $passwordConfirm: $('#signup-password-confirm', this.$target),
      $name: $('#signup-name', this.$target),
    };
    this.$$message = {
      $email: $('#email-message-box', this.$target),
      $password: $('#password-message-box', this.$target),
      $passwordConfirm: $('#password-confirm-message-box', this.$target),
      $name: $('#name-message-box', this.$target),
    };
  }

  bindEvent() {
    this.$signUpForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$$input.$email.addEventListener('input', this.handleEmailInput.bind(this));
    this.$$input.$email.addEventListener('focusout', this.checkOverlappedEmail.bind(this));
    this.$$input.$name.addEventListener('input', this.handleNameInput.bind(this));
    this.$$input.$password.addEventListener('input', this.handlePasswordInput.bind(this));
    this.$$input.$passwordConfirm.addEventListener('input', this.handlePasswordConfirmInput.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.isUniqueEmail) {
      alert(MESSAGE.SIGNUP.OVERLAP_CHECK_REQUIRED);

      return;
    }

    const $input = findInValidInput(this.$$input);

    if ($input) {
      $input.value = '';
      $input.focus();

      return;
    }

    try {
      await this.signUp();
      this.clearInputs();
      routeTo(ROUTE.SIGNIN);
    } catch (error) {
      console.error(error.message);
    }
  }

  async signUp() {
    const url = `${BASE_URL}/members`;
    const option = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.$$input.$email.value,
        password: encrypt(this.$$input.$password.value),
        name: this.$$input.$name.value,
      }),
    };

    try {
      await request(url, option);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  clearInputs() {
    this.$$input.$email.value = '';
    this.$$input.$name.value = '';
    this.$$input.$password.value = '';
    this.$$input.$passwordConfirm.value = '';
  }

  handleEmailInput({ target: { value } }) {
    this.isUniqueEmail = false;

    if (!isValidEmail(value)) {
      this.$$message.$email.classList.replace('text-green', 'text-red');
      this.$$message.$email.innerText = MESSAGE.SIGNUP.INVALID_EMAIL;

      return;
    }

    this.$$message.$email.innerText = '';
  }

  handleNameInput({ target: { value } }) {
    isValidName(value) //
      ? this.$$message.$name.classList.add('hidden')
      : this.$$message.$name.classList.remove('hidden');
  }

  handlePasswordInput({ target: { value } }) {
    isValidPassword(value) //
      ? this.$$message.$password.classList.add('hidden')
      : this.$$message.$password.classList.remove('hidden');

    value === this.$$input.$passwordConfirm.value || this.$$input.$passwordConfirm.value === ''
      ? this.$$message.$passwordConfirm.classList.add('hidden')
      : this.$$message.$passwordConfirm.classList.remove('hidden');
  }

  handlePasswordConfirmInput({ target: { value } }) {
    value === this.$$input.$password.value
      ? this.$$message.$passwordConfirm.classList.add('hidden')
      : this.$$message.$passwordConfirm.classList.remove('hidden');
  }

  async checkOverlappedEmail({ target: { value: email } }) {
    if (!isValidEmail(email)) return;
    const url = `${BASE_URL}/members/check-validation?email=${encodeURIComponent(email)}`;

    try {
      await request(url);
      this.isUniqueEmail = true;
      this.$$message.$email.innerText = MESSAGE.SIGNUP.UNIQUE_EMAIL;
      this.$$message.$email.classList.replace('text-red', 'text-green');
    } catch (error) {
      console.error(error.message);
      this.$$message.$email.innerText = MESSAGE.SIGNUP.OVERLAPPED_EMAIL;
      this.$$message.$email.classList.replace('text-green', 'text-red');
    }
  }
}
