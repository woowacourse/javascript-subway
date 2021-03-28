import Component from '../../core/Component.js';
import { mainTemplate } from './template/main.js';

class Station extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {}
}

export default Station;
