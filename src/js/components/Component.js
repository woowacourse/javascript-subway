import { ID_SELECTOR } from "../constants.js";
import router from "../router.js";
import $ from "../utils/querySelector.js";

class Component {
  constructor(state) {
    // TODO: 객체 예외처리 생각해보기
    this.state = state;
  }

  initEvent() {
  }

  render({ TITLE, MAIN, MODAL }) {
    $('title').innerHTML = TITLE;
    $(`#${ID_SELECTOR.MAIN}`).innerHTML = MAIN;
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = MODAL ? MODAL : '';
  }

  _onAnchorClicked(event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');

    history.pushState({ path }, null, path);
    router.render(path);
  }
}

export default Component;
