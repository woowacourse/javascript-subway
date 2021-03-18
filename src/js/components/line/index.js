import Component from '../../core/Component.js';
import { mainTemplate } from './template/main.js';

class Line extends Component {
  constructor(parentNode) {
    super(parentNode);
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {}
}

export default Line;
