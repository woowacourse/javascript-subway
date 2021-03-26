import { STATE_KEY, ROUTE, SESSION_KEY } from '../constants/constants';
import { mainElements } from '../views';
import { stateManager } from '../../@shared/models/StateManager';
import { $, setToSessionStorage, clearInput, removeFromSessionStorage } from '../../@shared/utils';
import { routeTo, userAuthAPI } from '../utils';

export class UserAuth {
  constructor(props) {
    this.$target = mainElements[ROUTE.SIGNIN];
    this.props = props;
    this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    stateManager[STATE_KEY.SIGNED_USER].subscribe(this.signOut.bind(this));
  }

  signOut() {
    if (stateManager[STATE_KEY.SIGNED_USER].get()) return;
    removeFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    this.props.cache.stations = [];
    this.props.cache.lines = [];
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
      const { accessToken } = await userAuthAPI.signIn(this.$$input);
      const userName = await userAuthAPI.getUserName(accessToken);

      setToSessionStorage(SESSION_KEY.ACCESS_TOKEN, accessToken);
      this.$signInForm.reset();
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
}
