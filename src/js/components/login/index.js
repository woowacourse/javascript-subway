import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import { PATH } from '../../constants/url.js';
import request from '../../utils/request.js';
import { AUTHENTICATED_LINK } from '../../constants/link.js';
import ValidationError from '../../error/ValidationError.js';
import { INVALID_MESSAGE } from '../../constants/message.js';
import getFetchParams from '../../api/getFetchParams.js';

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
    const params = getFetchParams({
      path: PATH.MEMBERS.LOGIN,
      body: { email, password },
    });
    const response = await request.post(params);

    if (response.status === 400) {
      throw new ValidationError(INVALID_MESSAGE.LOGIN.FAILED);
    }

    if (!response.ok) throw Error(response.message);

    const { accessToken } = await response.json();

    this.stateManagers.accessToken.setToken(accessToken);
    this.stateManagers.route.goPage(AUTHENTICATED_LINK.STATION.ROUTE);
  }
}

export default Login;
