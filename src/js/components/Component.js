import { ID_SELECTOR } from '../constants.js';
import $ from '../utils/querySelector.js';

class Component {
  //TODO: props와 state 나누기
  constructor(props) {
    if (!props) {
      this.props = {};
      return;
    }

    this.props = props;
  }

  initEvent() {}

  render({ TITLE, MAIN, MODAL }) {
    $('title').innerHTML = TITLE;
    $(`#${ID_SELECTOR.MAIN}`).innerHTML = MAIN;
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = MODAL ? MODAL : '';
  }

  // TODO: 행동 기반의 메서드명 고민
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