import Apis from '../../api';
import { AUTHENTICATED_LINK } from '../../constants/link';
import PageComponent from '../../core/PageComponent';
import template from './template';

class Map extends PageComponent {
  constructor({ parentNode, props: { updateSubwayState } }) {
    super({ parentNode, pathname: AUTHENTICATED_LINK.MAP.PATH });

    this.updateSubwayState = updateSubwayState;
  }

  renderSelf() {
    this.parentNode.innerHTML = template({ state: this.state });
  }
}

export default Map;
