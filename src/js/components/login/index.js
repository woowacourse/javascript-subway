import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import request from '../../utils/fetch.js';
import { AUTHENTICATED_LINK } from '../../constants/header.js';
import accessTokenManager from '../../stateManagers/AccessTokenManager.js';
import routeManager from '../../stateManagers/RouteManager.js';
import ValidationError from '../../error/ValidationError.js';

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

      try {
        const response = await request.post(BASE_URL + PATH.MEMBERS.LOGIN, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: e.target['email'].value,
            password: e.target['password'].value,
          }),
        });

        if (response.status === 500) {
          throw new ValidationError('등록되지 않은 아이디 입니다.');
        }

        if (response.status === 400) {
          throw new ValidationError('비밀번호가 틀렸습니다.');
        }

        const { accessToken } = await response.json();

        accessTokenManager.setToken(accessToken);
        routeManager.goPage(AUTHENTICATED_LINK.STATION.ROUTE);
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
