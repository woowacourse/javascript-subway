import Component from '../../core/Component.js';
import { $ } from '../../utils/querySelector.js';
import { loginTemplate } from './template.js';

export default class Login extends Component {
  constructor({ changeTemplate }) {
    super();
    this.changeTemplate = changeTemplate;
  }

  bindEvent() {
    $('#signup-button').addEventListener(
      'click',
      this.handleSingupButton.bind(this),
    );
  }

  handleSingupButton(e) {
    e.preventDefault();

    const url = e.target.closest('.navigation-link').getAttribute('href');
    this.changeTemplate(url);
    history.pushState({ url }, null, url);
  }

  render() {
    $('main').innerHTML = loginTemplate();
  }
}
