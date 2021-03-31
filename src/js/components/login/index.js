import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import { AUTHENTICATED_LINK } from '../../constants/link.js';
import ValidationError from '../../error/ValidationError.js';
import { INVALID_MESSAGE } from '../../constants/message.js';
import { publicApis } from '../../api/apis.js';

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
        const response = await publicApis.login({ body: { email, password } });

        if (response.status === 400) {
          throw new ValidationError(INVALID_MESSAGE.LOGIN.FAILED);
        }

        if (!response.ok) throw Error(response.message);

        const { accessToken } = await response.json();

        this.stateManagers.accessToken.setToken(accessToken);
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
