import Component from '../../core/Component.js';
import { mainTemplate } from './template/main.js';

class Line extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {}
}

export default Line;
