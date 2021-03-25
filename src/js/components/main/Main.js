import Component from '../../core/Component.js';
import { $ } from '../../utils/querySelector.js';
import { mainTemplate } from './template.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';

export default class Main extends Component {
  constructor() {
    super();
  }

  bindEvent() {}

  render(token) {
    $('main').innerHTML = token ? mainTemplate() : LOGIN_REQUIRED_TEMPLATE;
  }

  load(token = '') {
    this.render(token);
    this.bindEvent();
  }
}
