import Component from '../../core/Component.js';
import { linesTemplate } from './template.js';
import { $ } from '../../utils/index.js';

export default class Lines extends Component {
  constructor() {
    super();
  }

  render() {
    $('main').innerHTML = linesTemplate();
  }
}
