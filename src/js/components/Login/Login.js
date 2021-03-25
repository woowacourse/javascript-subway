import Component from '../../core/Component.js';
import { $, showSnackbar, setLocalStorageItem } from '../../utils/index.js';
import { loginTemplate } from './template.js';
import { SNACKBAR_MESSAGE, LOCAL_STORAGE_KEY } from '../../constants/index.js';
import Navigation from '../navigation/Navigation.js';
import { getAccessToken } from '../../service/index.js';

export default class Login extends Component {
  constructor({ changeTemplate }) {
    super();
    this.changeTemplate = changeTemplate;
  }

  bindEvent() {
    $('#login-form').addEventListener(
      'submit',
      this.handleLoginForm.bind(this),
    );
    $('#signup-button').addEventListener(
      'click',
      this.handleSingupButton.bind(this),
    );
  }

  async handleLoginForm(e) {
    e.preventDefault();

    const email = e.target.elements['login-email'].value;
    const password = e.target.elements['login-password'].value;

    const accessToken = await getAccessToken({ email, password });

    if (!accessToken) {
      showSnackbar(SNACKBAR_MESSAGE.LOGIN_FAILURE);
      return;
    }

    showSnackbar(SNACKBAR_MESSAGE.LOGIN_SUCCESS);
    setLocalStorageItem({
      key: LOCAL_STORAGE_KEY.TOKEN,
      item: accessToken,
    });

    this.changeTemplate('/');
    history.pushState({ pathName: '/' }, null, '/');
    Navigation.changeSelectedButtonColor();
  }

  handleSingupButton(e) {
    e.preventDefault();

    const pathName = e.target.closest('.navigation-link').getAttribute('href');
    this.changeTemplate(pathName);
    history.pushState({ pathName }, null, pathName);
  }

  render() {
    $('main').innerHTML = loginTemplate();
  }

  load() {
    this.render();
    this.bindEvent();
  }
}
