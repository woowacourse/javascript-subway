import { $ } from '../../utils/dom';

class Home {
  constructor() {
    this.loggedIn = false;
  }

  init(loggedIn) {
    this.loggedIn = loggedIn;
    this.initDOM();
  }

  initDOM() {
    this.$target = $('.container .heading');
    this.$target.innerHTML = this.loggedIn
      ? '메뉴를 선택해주세요'
      : '로그인을 해주세요';
  }
}

export default Home;
