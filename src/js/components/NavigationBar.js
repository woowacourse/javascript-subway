import { $ } from '../utils/dom.js';
import { render } from '../../js/router.js';
import { SELECTOR } from '../constants/constants.js';

// TODO: isLogged 의 상태에 따라서 로그인/로그아웃 버튼 텍스트 변경
export default class NavigationBar {
  constructor(store) {
    this.store = store;
  }

  init() {
    this.selectDOM();
    this.bindEvents();
  }

  selectDOM() {
    this.navigation = $(SELECTOR.NAVIGATION);
  }

  bindEvents() {
    this.navigation.addEventListener('click', async (e) => {
      if (!e.target.matches(`${SELECTOR.NAVIGATION} button`)) return;

      e.preventDefault();
      const path = e.target.closest('a').getAttribute('href');

      // TODO: logout 버튼과 기능 만들기
      await render(path, this.store.userSession.isLoggedIn);
    });
  }
}
