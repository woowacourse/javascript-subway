import { DOM, STATE_KEY, ROUTE, SESSION_KEY } from '../constants';
import { store, updateUserInfo } from '../../subway/models/store';
import { setToSessionStorage, removeFromSessionStorage } from '../../@shared/utils';
import { routeTo, userAuthAPI } from '../utils';
import { Component } from '../../@shared/models/Component';

export class UserAuth extends Component {
  setup() {
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(this.signOut.bind(this));
  }

  signOut() {
    if (store[STATE_KEY.SIGNED_USER_NAME].get()) return;
    removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    store[STATE_KEY.STATIONS].clear();
    store[STATE_KEY.LINES].clear();
  }

  bindEvent() {
    DOM.USER_AUTH.MAIN.FORM.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const $$input = {
      $email: DOM.USER_AUTH.MAIN.EMAIL_INPUT,
      $password: DOM.USER_AUTH.MAIN.PASSWORD_INPUT,
    };

    try {
      const { accessToken } = await userAuthAPI.signIn($$input);
      const userName = await userAuthAPI.getUserName(accessToken);

      setToSessionStorage(SESSION_KEY.ACCESS_TOKEN, accessToken);
      DOM.USER_AUTH.MAIN.FORM.reset();
      DOM.USER_AUTH.MAIN.PASSWORD_MSG.innerText = '';
      updateUserInfo(userName);
      routeTo(ROUTE.ROOT);
    } catch (error) {
      DOM.USER_AUTH.MAIN.PASSWORD_MSG.innerText = error.message;
      DOM.USER_AUTH.MAIN.PASSWORD_INPUT.value = '';
      DOM.USER_AUTH.MAIN.PASSWORD_INPUT.focus();
    }
  }
}
