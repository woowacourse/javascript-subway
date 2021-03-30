import { DOM } from '../constants/dom';
import { STATE_KEY, ROUTE, SESSION_KEY } from '../constants/constants';
import { store } from '../../subway/models/store';
import { setToSessionStorage, removeFromSessionStorage } from '../../@shared/utils';
import { routeTo, userAuthAPI } from '../utils';

export class UserAuth {
  constructor(props) {
    this.props = props;
    this.setup();
    this.bindEvent();
  }

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
    try {
      const $$input = {
        $email: DOM.USER_AUTH.MAIN.EMAIL_INPUT,
        $password: DOM.USER_AUTH.MAIN.PASSWORD_INPUT,
      };
      const { accessToken } = await userAuthAPI.signIn($$input);
      const userName = await userAuthAPI.getUserName(accessToken);

      setToSessionStorage(SESSION_KEY.ACCESS_TOKEN, accessToken);
      DOM.USER_AUTH.MAIN.FORM.reset();
      DOM.USER_AUTH.MAIN.PASSWORD_MSG.classList.add('hidden');
      store[STATE_KEY.SIGNED_USER_NAME].set(userName);
      store[STATE_KEY.STATIONS].update();
      store[STATE_KEY.LINES].update();
      routeTo(ROUTE.ROOT);
    } catch (error) {
      console.error(error.message);
      DOM.USER_AUTH.MAIN.PASSWORD_MSG.classList.remove('hidden');
      DOM.USER_AUTH.MAIN.PASSWORD_INPUT.value = '';
      DOM.USER_AUTH.MAIN.PASSWORD_INPUT.focus();
    }
  }
}
