import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import Signup from '../signup/index.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import request from '../../utils/fetch.js';

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
      } catch (error) {
        console.error(error);
      }
      // TODO:
      // request하기
    });
  }
}

export default Login;
