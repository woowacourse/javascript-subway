import { $ } from '../utils/dom.js';
export default class EntryPage {
  constructor(store) {
    this.store = store;
  }

  init() {
    this.selectDOM();
    this.bindEvents();
    this.renderPage();
  }

  selectDOM() {
    this.$description = $('#app-description');
  }

  bindEvents() {}

  renderPage() {
    if (this.store.userSession.isLoggedIn) {
      this.$description.textContent = '상단 탭을 클릭해주세요. 🦕';
    } else {
      this.$description.textContent =
        '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.';
    }
  }
}
