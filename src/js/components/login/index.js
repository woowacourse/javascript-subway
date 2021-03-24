import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import request from '../../utils/fetch.js';
import { AUTHENTICATED_LINK } from '../../constants/link.js';
import ValidationError from '../../error/ValidationError.js';
import { ERROR_MESSAGE } from '../../constants/message.js';
import HEADERS from '../../constants/headers.js';

class Login extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $('#login-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = e.target['email'].value;
      const password = e.target['password'].value;

      try {
        await this.login(email, password);
      } catch (error) {
        if (error instanceof ValidationError) {
          $('.js-login-check').innerText = error.message;
        }
        console.error(error);
      }
    });
  }

  async login(email, password) {
    const response = await request.post(BASE_URL + PATH.MEMBERS.LOGIN, {
      headers: {
        ...HEADERS.CONTENT_TYPE.JSON,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status === 400) {
      throw new ValidationError(ERROR_MESSAGE.LOGIN.FAILED);
    }

    if (!response.ok) throw Error(response.message);

    const { accessToken } = await response.json();

    this.stateManagers.accessToken.setToken(accessToken);
    this.stateManagers.route.goPage(AUTHENTICATED_LINK.STATION.ROUTE);
  }
}

export default Login;
