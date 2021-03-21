import Component from './Component.js';
import LOGIN_TEMPLATE from '../templates/loginTemplate.js';
import $ from '../utils/querySelector.js';
import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  ID_SELECTOR,
  REQUEST_URL,
} from '../constants.js';
import router from '../router.js';
import { fetchLogin } from '../utils/fetch.js';

class LoginComponent extends Component {
  constructor(state) {
    super(state);
  }

  initEvent() {
    $(`#${ID_SELECTOR.MAIN} .${CLASS_SELECTOR.ANCHOR}`).addEventListener(
      'click',
      this._onAnchorClicked
    );

    $(`#${ID_SELECTOR.LOGIN_FORM}`).addEventListener(
      'submit',
      this.#onLoginSubmit
    );
  }

  async #onLoginSubmit(event) {
    event.preventDefault();

    const email = event.target[ID_SELECTOR.LOGIN_FORM_EMAIL].value;
    const password = event.target[ID_SELECTOR.LOGIN_FORM_PASSWORD].value;

    const url = REQUEST_URL + '/login/token';
    const data = { email, password };

    try {
      const response = await fetchLogin(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Content-Length': 72,
        },
      });
    } catch (err) {
      alert(err.message);
      return;
    }

    alert(ALERT_MESSAGE.LOGIN_SUCCESS);

    router.render('/');
  }

  render() {
    super.render(LOGIN_TEMPLATE);
  }
}

export default LoginComponent;
