import Component from './Component.js';
import LOGIN_TEMPLATE from '../templates/loginTemplate.js';
import $ from '../utils/querySelector.js';
import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  ID_SELECTOR,
  REQUEST_URL,
} from '../constants.js';
import { fetchLogin } from '../utils/fetch.js';

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    // TODO: KEY값 상수화
    if (!this.props?.appState.getData('loginResponse')) {
      alert('not exist loginResponse');
    }
  }

  initEvent() {
    // TODO: 가독성을 위해서 추상화 하기 (회원 가입)
    $(`#${ID_SELECTOR.MAIN} .${CLASS_SELECTOR.ANCHOR}`).addEventListener(
      'click',
      this._onAnchorClicked
    );

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
      const response = await fetchLogin(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Content-Length': 72,
        },
      });
      alert(ALERT_MESSAGE.LOGIN_SUCCESS);

      const loginResponse = await response.json();
      this.props.appState.setData({ loginResponse });

      this.props.route('/');
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