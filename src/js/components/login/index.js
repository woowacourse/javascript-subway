import { $ } from '../../utils/DOM.js';
import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';
import Signup from '../signup/index.js';

class Login extends Component {
  constructor(parentNode) {
    super(parentNode);
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $('#signup').addEventListener('click', (e) => {
      e.preventDefault();
      const route = e.target.getAttribute('href');
      history.pushState({ route }, null, route);
      new Signup(this.parentNode);
    });

    $('#login-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const email = e.target['email'].value;
      const password = e.target['password'].value;

      // TODO:
      // request하기
    });
  }
}

export default Login;
