import Component from '../../core/Component.js';
import { sectionsTemplate } from './template.js';
import { $ } from '../../utils/index.js';

export default class Sections extends Component {
  constructor() {
    super();
  }

  render() {
    $('main').innerHTML = sectionsTemplate();
  }
}
