import { requestStationAndLine } from '../../api';
import Component from '../../core/Component';
import template from './template';

class Map extends Component {
  constructor({ parentNode, state }) {
    super({ parentNode, state });
  }

  renderSelf() {
    this.parentNode.innerHTML = template({ state: this.state });
  }

  async updateSubwayState() {
    this.setState(await requestStationAndLine());
  }
}

export default Map;
