import { contentElements } from '../views';
import { $ } from '../../@shared/utils';
import { ROUTE } from '../constants/constants';
import { isValidEmail, isValidName, isValidPassword, findInValidInput } from '../utils/validate';

export class UserJoin {
  constructor() {
    this.$target = contentElements[ROUTE.SIGNUP];
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$signUpForm = $('#signup-form', this.$target);
    this.$$input = {
      $email: $('#signup-email', this.$target),
      $name: $('#signup-name', this.$target),
      $password: $('#signup-password', this.$target),
      $passwordConfirm: $('#signup-password-confirm', this.$target),
    };
    this.$$message = {
      $email: $('#signup-email + .js-message-box', this.$target),
      $name: $('#signup-name + .js-message-box', this.$target),
      $password: $('#signup-password + .js-message-box', this.$target),
      $passwordConfirm: $('#signup-password-confirm + .js-message-box', this.$target),
    };
  }

  bindEvent() {
    this.$signUpForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$$input.$email.addEventListener('input', this.handleEmailInput.bind(this));
    this.$$input.$name.addEventListener('input', this.handleNameInput.bind(this));
    this.$$input.$password.addEventListener('input', this.handlePasswordInput.bind(this));
    this.$$input.$passwordConfirm.addEventListener('input', this.handlePasswordConfirmInput.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    const $input = findInValidInput(this.$$input);

    if ($input) {
      $input.value = '';
      $input.focus();

      return;
    }
  }

  handleEmailInput({ target: { value } }) {
    isValidEmail(value) //
      ? this.$$message.$email.classList.add('hidden')
      : this.$$message.$email.classList.remove('hidden');
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
  }

  handlePasswordConfirmInput({ target: { value } }) {
    value === this.$$input.$password.value
      ? this.$$message.passwordConfirm.classList.add('hidden')
      : this.$$message.passwordConfirm.classList.remove('hidden');
  }
}
