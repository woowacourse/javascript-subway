import { ID_SELECTOR } from "../constants.js";
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
}

export default Component;
