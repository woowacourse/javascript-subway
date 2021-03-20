import { STATE_KEY, ROUTE, MESSAGE, BASE_URL } from '../constants/constants';
import { contentElements } from '../views';
import { $ } from '../../@shared/utils';
import { stateManager } from '../../@shared/models/StateManager';
import { SHA256 } from '../utils';

export class UserAuth {
  constructor() {
    this.$target = contentElements[ROUTE.SIGNIN];
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$signInForm = $('#signin-form', this.$target);
    this.$$input = {
      $email: $('#signin-email', this.$target),
      $password: $('#signin-password', this.$target),
    };
    this.$failMessage = $('#fail-message-box', this.$target);
  }

  bindEvent() {
    this.$signInForm.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { accessToken } = await this.signIn();

      console.log(SHA256(this.$$input.$password.value));
      this.clearInputs();
      this.$failMessage.classList.add('hidden');
      history.pushState({ path: ROUTE.ROOT }, null, ROUTE.ROOT);
      stateManager[STATE_KEY.IS_SIGNED].set(true);
      stateManager[STATE_KEY.ROUTE].set(ROUTE.ROOT);
    } catch (error) {
      this.$failMessage.classList.remove('hidden');
      this.$$input.$password.value = '';
      this.$$input.$password.focus();
    }
  }

  async signIn() {
    const url = `${BASE_URL}/login/token`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.$$input.$email.value,
        password: SHA256(this.$$input.$password.value),
      }),
    });

    if (response.ok) return response.json();
    throw new Error(MESSAGE.SIGNIN.FAIL);
  }

  clearInputs() {
    this.$$input.$email.value = '';
    this.$$input.$password.value = '';
  }
}
