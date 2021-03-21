import stationsTemplate from '../templates/stations.js';
import { $ } from '../utils/DOM.js';

class StationsPage {
  constructor(router) {
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
  }

  renderView() {
    this.$main.innerHTML = stationsTemplate;
  }
}

export default StationsPage;
