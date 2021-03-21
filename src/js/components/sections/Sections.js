import Component from '../../core/Component.js';
import { sectionsTemplate } from './template.js';
import { $ } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';

export default class Sections extends Component {
  constructor() {
    super();
  }

  bindEvent() {}

  render(token) {
    $('main').innerHTML = token ? sectionsTemplate() : LOGIN_REQUIRED_TEMPLATE;
  }

  load(token = '') {
    this.render(token);
    this.bindEvent();
  }
}
