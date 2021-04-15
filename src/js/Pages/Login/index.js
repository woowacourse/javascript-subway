import { $ } from '../../utils/DOM';
import Component from '../../core/Component';
import mainTemplate from './template';
import { AUTHENTICATED_LINK } from '../../constants/link';
import Apis from '../../api';
import LOCAL_STORAGE_KEY from '../../constants/localStorage';
import { showSnackbar } from '../../utils/snackbar';
import { SNACKBAR_MESSAGE } from '../../constants/message';
import Router from '../../Router';
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
        const { accessToken } = await Apis.members.login(email, password);

        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESSTOKEN, accessToken);
        this.setIsLogin(true);

        Router.goPage(AUTHENTICATED_LINK.STATION.PATH);
        showSnackbar(SNACKBAR_MESSAGE.LOGIN.SUCCESS);
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
