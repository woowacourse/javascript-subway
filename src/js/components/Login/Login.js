import Component from '../../core/Component.js';
import { $ } from '../../utils/querySelector.js';
import { loginTemplate } from './template.js';

export default class Login extends Component {
  constructor() {
    super();
  }

  render() {
    $('main').innerHTML = loginTemplate();
  }
}
