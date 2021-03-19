import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import request from '../../utils/fetch.js';
import Station from '../station/index.js';
import { ROUTE } from '../../constants/route.js';

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

        localStorage.setItem('accessToken', accessToken);

        history.pushState({ route: ROUTE.STATION }, null, ROUTE.STATION);
        new Station(this.parentNode);

        // 로그아웃 버튼 만들기

        $('a[herf="/login"]');
      } catch (error) {
        console.error(error);
      }
    });
  }
}

export default Login;
