import { $ } from '../../utils/DOM';
import PageComponent from '../../core/PageComponent';
import mainTemplate from './template';
import Apis from '../../api';
import HTTPError from '../../error/HTTPError';
import { UNAUTHENTICATED_LINK } from '../../constants/link';

class Login extends PageComponent {
  constructor({ parentNode }) {
    super({ parentNode, pathname: UNAUTHENTICATED_LINK.LOGIN.PATH });
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
