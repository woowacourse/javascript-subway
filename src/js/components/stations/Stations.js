import Component from '../../core/Component.js';
import { stationsTemplate } from './template.js';
import { $ } from '../../utils/index.js';

export default class Stations extends Component {
  constructor() {
    super();
  }

  bindEvent() {}

  render() {
    $('main').innerHTML = stationsTemplate();
  }

  load() {
    this.render();
    this.bindEvent();
  }
}
