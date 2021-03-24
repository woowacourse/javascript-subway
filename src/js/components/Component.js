import { ID_SELECTOR } from '../constants.js';
import $ from '../utils/querySelector.js';

class Component {
  constructor(props = {}) {
    this.props = props;
  }

  initialize() {}

  // TODO: initialize 안에서 기본 동작으로 호출할지 고민
  initEvent() {}

  render({ TITLE, MAIN, MODAL }) {
    $('title').innerHTML = TITLE;
    $(`#${ID_SELECTOR.MAIN}`).innerHTML = MAIN;
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = MODAL ? MODAL : '';
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
