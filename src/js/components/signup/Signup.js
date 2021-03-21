import Component from '../../core/Component.js';
import { signupTemplate } from './template.js';
import { $, showSnackbar } from '../../utils/index.js';
import { SNACKBAR_MESSAGE } from '../../constants/snackbarMessage.js';

export default class Signup extends Component {
  constructor() {
    super();
  }

  bindEvent() {
    $('#signup-form').addEventListener(
      'submit',
      this.handleSignupForm.bind(this),
    );
  }

  async handleSignupForm(e) {
    e.preventDefault();

    const name = e.target.elements['signup-name'].value;
    const email = e.target.elements['signup-email'].value;
    const password = e.target.elements['signup-password'].value;
    const confirmPassword = e.target.elements['signup-password-confirm'].value;
    console.log(name, email, password, confirmPassword);
    if (password !== confirmPassword) {
      showSnackbar(SNACKBAR_MESSAGE.NOT_MATCH_CONFIRM_PASSWORD);
      return;
    }

    // const response = await API.signup({ email, password, name });

    // if (!response.ok) {
    //   showSnackbar(SNACKBAR_MESSAGE.SIGNUP_FAILURE);
    //   return;
    // }

    showSnackbar(SNACKBAR_MESSAGE.SIGNUP_SUCCESS);
  }

  render() {
    $('main').innerHTML = signupTemplate();
  }

  load() {
    this.render();
    this.bindEvent();
  }
}
