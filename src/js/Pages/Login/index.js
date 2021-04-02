import { $ } from '../../utils/DOM';
import Component from '../../core/Component';
import mainTemplate from './template';
import { AUTHENTICATED_LINK } from '../../constants/link';
import ValidationError from '../../error/ValidationError';
import { publicApis } from '../../api';
import localStorageKey from '../../constants/localStorage';

class Login extends Component {
  constructor({ parentNode, props: { goPage, setIsLogin } }) {
    super({ parentNode });

    this.goPage = goPage;
    this.setIsLogin = setIsLogin;
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
        const accessToken = await publicApis.login(email, password);

        localStorage.setItem(localStorageKey.ACCESSTOKEN, accessToken);
        this.setIsLogin(true);

        this.goPage(AUTHENTICATED_LINK.STATION.PATH);
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
