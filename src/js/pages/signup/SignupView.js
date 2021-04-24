import { MESSAGE } from '../../constants/messages.js';
import { $ } from '../../utils/DOM.js';
import signupTemplate from './signupTemplate.js';

class SignupView {
  async init() {
    $('#main').innerHTML = signupTemplate;
  }

  renderFailInput() {
    $('#email-input').classList.remove('success');
    $('#email-input').classList.add('fail');

    $('#email-form-message').innerText = MESSAGE.ERROR.DUPLICATED_EMAIL;
  }

  renderSuccessInput() {
    $('#email-form-message').innerText = MESSAGE.SUCCESS.AVAILABLE_EMAIL;
    $('#email-form-message').classList.remove('d-none');
  }
}

export default SignupView;
