import { STATE_KEY, ROUTE, BASE_URL, SESSION_KEY } from '../constants/constants';
import { contentElements } from '../views';
import { stateManager } from '../../@shared/models/StateManager';
import { $, encrypt, request, setToSessionStorage } from '../../@shared/utils';
import { routeTo, getUserName } from '../utils';

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
      const userName = await getUserName(accessToken);

      setToSessionStorage(SESSION_KEY.ACCESS_TOKEN, accessToken);
      this.clearInputs();
      this.$failMessage.classList.add('hidden');
      stateManager[STATE_KEY.SIGNED_USER].set(userName);
      routeTo(ROUTE.ROOT);
    } catch (error) {
      console.error(error.message);
      this.$failMessage.classList.remove('hidden');
      this.$$input.$password.value = '';
      this.$$input.$password.focus();
    }
  }

  async signIn() {
    const url = `${BASE_URL}/login/token`;
    const option = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.$$input.$email.value,
        password: encrypt(this.$$input.$password.value),
      }),
    };

    try {
      const response = await request(url, option);

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  clearInputs() {
    this.$$input.$email.value = '';
    this.$$input.$password.value = '';
  }
}
