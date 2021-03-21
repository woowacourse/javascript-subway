import Component from '../../core/Component.js';
import { linesTemplate } from './template.js';
import { $ } from '../../utils/index.js';

export default class Lines extends Component {
  constructor() {
    super();
  }

  bindEvent() {}

  render() {
    $('main').innerHTML = linesTemplate();
  }

  load() {
    this.render();
    this.bindEvent();
  }
}
