import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import ValidationError from '../../error/ValidationError.js';
import { login } from '../../api/apis.js';
import { AUTHENTICATED_LINK } from '../../constants/link.js';

class Login extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
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
        const accessToken = await login(email, password);
        this.stateManagers.accessToken.setToken(await accessToken);
        this.stateManagers.route.goPage(AUTHENTICATED_LINK.STATION.ROUTE);
      } catch (error) {
        if (error instanceof ValidationError) {
          $('.js-login-check').innerText = error.message;
        }
        console.error(error);
      }
    });
  }
}

export default Login;
