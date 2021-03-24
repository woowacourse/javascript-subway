import Component from '../../core/Component.js';
import { linesTemplate } from './template.js';
import { $ } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';

export default class Lines extends Component {
  constructor() {
    super();
  }

  bindEvent() {}

  render(token) {
    $('main').innerHTML = token ? linesTemplate() : LOGIN_REQUIRED_TEMPLATE;
  }

  load(token = '') {
    this.render(token);
    this.bindEvent();
  }
}
