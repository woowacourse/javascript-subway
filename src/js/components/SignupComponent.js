import Component from "./Component.js";
import SIGNUP_TEMPLATE from "../templates/signupTemplate.js";
import $ from "../utils/querySelector.js";
import { ALERT_MESSAGE, ID_SELECTOR, REQUEST_URL } from "../constants.js";
import { fetchSignup } from "../utils/fetch.js";
import router from "../router.js";

class SignupComponent extends Component {
  constructor(state) {
    super(state);
  }

  initEvent() {
    $(`#${ID_SELECTOR.SIGNUP_FORM}`).addEventListener('submit', this.#onSignupSubmit);
  }

  async #onSignupSubmit(event) {
    event.preventDefault();

    const email = event.target[ID_SELECTOR.SIGNUP_FORM_EMAIL].value;
    const name = event.target[ID_SELECTOR.SIGNUP_FORM_NAME].value;
    const password = event.target[ID_SELECTOR.SIGNUP_FORM_PASSWORD].value;
    const passwordConfirm = event.target[ID_SELECTOR.SIGNUP_FORM_PASSWORD_CONFIRM].value;

    if (password !== passwordConfirm) {
      return;
    }

    const url = REQUEST_URL + '/members';
    const data = { email, name, password };

    try {
      const response = await fetchSignup(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Content-Length': 96
        }
      });
    } catch (err) {
      alert(err.message);
      return;
    }

    alert(ALERT_MESSAGE.SIGNUP_SUCCESS);

    router.render('/pages/login.html');
  }

  render() {
    super.render(SIGNUP_TEMPLATE);
  }

}

export default SignupComponent;
