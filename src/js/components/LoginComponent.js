import Component from './Component.js';
import LOGIN_TEMPLATE from '../templates/loginTemplate.js';
import $ from '../utils/querySelector.js';
import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  ID_SELECTOR,
  REQUEST_URL,
  STATE_KEY,
} from '../constants.js';
import { fetchLogin } from '../utils/fetch.js';

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    if (!this.props?.appState.getData(STATE_KEY.LOGIN_RESPONSE)) {
      console.error('not exist loginResponse');
    }
  }

  initEvent() {
    const signupAnchor = $(`#${ID_SELECTOR.MAIN} .${CLASS_SELECTOR.ANCHOR}`);

    signupAnchor.addEventListener('click', this._onAnchorClicked);
    $(`#${ID_SELECTOR.LOGIN_FORM}`).addEventListener(
      'submit',
      this.#onLoginSubmit
    );
  }

  #onLoginSubmit = async event => {
    event.preventDefault();

    const email = event.target[ID_SELECTOR.LOGIN_FORM_EMAIL].value;
    const password = event.target[ID_SELECTOR.LOGIN_FORM_PASSWORD].value;

    const url = REQUEST_URL + '/login/token';
    const data = { email, password };

    try {
      const response = await fetchLogin(url, data);
      alert(ALERT_MESSAGE.LOGIN_SUCCESS);

      const loginResponse = await response.json();
      this.props.appState.setData({ loginResponse });
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  render() {
    super.render(LOGIN_TEMPLATE);
  }
}

export default LoginComponent;
