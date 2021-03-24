import Component from '../../core/Component.js';
import { stationsTemplate } from './template.js';
import { $ } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';
export default class Stations extends Component {
  constructor() {
    super();
  }

  bindEvent() {}

  render(token) {
    $('main').innerHTML = token ? stationsTemplate() : LOGIN_REQUIRED_TEMPLATE;
  }

  load(token = '') {
    this.render(token);
    this.bindEvent();
  }
}
