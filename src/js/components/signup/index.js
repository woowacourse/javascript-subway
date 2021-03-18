import { $ } from '../../utils/DOM.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import request from '../../utils/fetch.js';
import mainTemplate from './template/main.js';

class Signup extends Component {
  constructor(parentNode) {
    super(parentNode);
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $('#signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target['name'].value;
      const email = e.target['email'].value;
      const password = e.target['password'].value;
      const passwordConfirm = e.target['password-confirm'].value;

      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        const response = await request.post(BASE_URL + PATH.MEMBERS.SIGNUP, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    });
  }
}

export default Signup;
