import { $ } from '../../utils/DOM';
import Component from '../../core/Component';
import mainTemplate from './template';
import { AUTHENTICATED_LINK } from '../../constants/link';
import ValidationError from '../../error/ValidationError';
import { INVALID_MESSAGE } from '../../constants/message';
import { publicApis } from '../../api';

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
        const response = await publicApis.login({ body: { email, password } });

        if (response.status === 400) {
          throw new ValidationError(INVALID_MESSAGE.LOGIN.FAILED);
        }

        if (!response.ok) throw Error(response.message);

        const { accessToken } = await response.json();

        // this.states.accessToken.setToken(accessToken);
        localStorage.setItem('accessToken', accessToken);
        this.setIsLogin(true);
        this.goPage(AUTHENTICATED_LINK.STATION.ROUTE);
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
