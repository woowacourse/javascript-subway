import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import request from '../../utils/fetch.js';
import { AUTHENTICATED_LINK } from '../../constants/header.js';
import accessTokenManager from '../../stateManagers/AccessTokenManager.js';
import routeManager from '../../stateManagers/RouteManager.js';

class Login extends Component {
  constructor(parentNode) {
    super(parentNode);
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
        const response = await request.post(BASE_URL + PATH.MEMBERS.LOGIN, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const { accessToken } = await response.json();

        accessTokenManager.setToken(accessToken);
        routeManager.setRoute(AUTHENTICATED_LINK.STATION.ROUTE);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

export default Login;
