import Component from '../../core/Component.js';
import { signupTemplate } from './template.js';
import { $ } from '../../utils/index.js';

export default class Signup extends Component {
  constructor() {
    super();
  }

  render() {
    $('main').innerHTML = signupTemplate();
  }
}
