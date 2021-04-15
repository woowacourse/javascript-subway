import Apis from '../../api';
import { AUTHENTICATED_LINK } from '../../constants/link';
import PageComponent from '../../core/PageComponent';
import template from './template';

class Map extends PageComponent {
  constructor({ parentNode }) {
    super({ parentNode, pathname: AUTHENTICATED_LINK.MAP.PATH });
  }

  renderSelf() {
    this.parentNode.innerHTML = template({ state: this.state });
  }

  async updateSubwayState() {
    this.setState(await Apis.getStationAndLine());
  }
}

export default Map;
