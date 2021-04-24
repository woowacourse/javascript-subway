import { MESSAGE } from '../../constants/messages.js';
import { $ } from '../../utils/DOM.js';
import loginTemplate from './loginTemplate.js';

class LoginView {
  async init() {
    $('#app-navbar').innerHTML = '';
    $('#navigation').innerHTML = '';
    $('#main').innerHTML = loginTemplate;
  }
}

export default LoginView;
