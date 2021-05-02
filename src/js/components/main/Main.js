import Component from '../../core/Component.js';
import { $ } from '../../utils/querySelector.js';
import { mainTemplate } from './template.js';

export default class Main extends Component {
  constructor() {
    super();
  }

  bindEvent() {}

  render() {
    $('main').innerHTML = mainTemplate();
  }

  load() {
    this.render();
    this.bindEvent();
  }
}
