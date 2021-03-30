import { ID_SELECTOR } from '../constants.js';
import $ from '../utils/querySelector.js';

class Component {
  constructor(props = {}) {
    this.props = props;
  }

  initialize() {
    this.initState();
    this.initStateListener();
    this.initLoad();
    this.initEvent();
  }

  initState() {}

  initStateListener() {}

  initLoad() {}

  initEvent() {}

  render({ TITLE, MAIN }) {
    $('title').innerHTML = TITLE;
    $(`#${ID_SELECTOR.MAIN}`).innerHTML = MAIN;
  }

  _onAnchorClicked = event => {
    event.preventDefault();
    const anchor = event.target.closest('a');

    if (!anchor) {
      return;
    }

    const path = anchor.getAttribute('href');
    const route = this.props?.route || this.route;

    route(path);
  };
}

export default Component;
