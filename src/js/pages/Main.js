import { $ } from '../utils/DOM.js';

class MainPage {
  constructor(router) {
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
  }

  renderView() {
    this.$main.innerHTML = `<h2> 메인페이지입니다 </h2>`;
  }
}

export default MainPage;
