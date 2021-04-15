import { $ } from '../../utils/DOM';
import Component from '../../core/Component';
import mainTemplate from './template';
import Apis from '../../api';
import HTTPError from '../../error/HTTPError';

class Login extends Component {
  constructor({ parentNode }) {
    super({ parentNode });
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $('#login-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = e.target['email'].value;
      const password = e.target['password'].value;

      try {
        await Apis.members.login(email, password);
      } catch (error) {
        if (error instanceof HTTPError) {
          $('.js-login-check').innerText = error.message;
          error.handleError();
        }

        console.error(error.message);
      }
    });
  }
}

export default Login;
