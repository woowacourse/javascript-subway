import Component from './Component.js';
import SIGNUP_TEMPLATE from '../templates/signupTemplate.js';
import $ from '../utils/querySelector.js';
import { ALERT_MESSAGE, ID_SELECTOR, REQUEST_URL, URL } from '../constants.js';
import { fetchSignup } from '../utils/fetch.js';

class SignupComponent extends Component {
  constructor(props) {
    super(props);
  }

  initEvent() {
    $(`#${ID_SELECTOR.SIGNUP_FORM}`).addEventListener(
      'submit',
      this.#onSignupSubmit
    );
  }

  render() {
    super.render(SIGNUP_TEMPLATE);
  }

  #onSignupSubmit = async event => {
    event.preventDefault();

    const email = event.target[ID_SELECTOR.SIGNUP_FORM_EMAIL].value;
    const name = event.target[ID_SELECTOR.SIGNUP_FORM_NAME].value;
    const password = event.target[ID_SELECTOR.SIGNUP_FORM_PASSWORD].value;
    const passwordConfirm =
      event.target[ID_SELECTOR.SIGNUP_FORM_PASSWORD_CONFIRM].value;

    if (password !== passwordConfirm) {
      return;
    }

    const url = REQUEST_URL + '/members';
    const bodyData = { email, name, password };

    try {
      const response = await fetchSignup(url, bodyData);
    } catch (err) {
      alert(err.message);
      return;
    }

    alert(ALERT_MESSAGE.SIGNUP_SUCCESS);

    this.props.route(URL.LOGIN);
  };
}

export default SignupComponent;
