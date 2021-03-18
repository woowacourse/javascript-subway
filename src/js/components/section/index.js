import Component from '../../core/Component.js';
import { mainTemplate } from './template/main.js';

class Section extends Component {
  constructor(parentNode) {
    super(parentNode);
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {}
}

export default Section;
