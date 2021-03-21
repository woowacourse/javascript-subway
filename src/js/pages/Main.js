import headerTemplate from '../templates/header.js';
import { $ } from '../utils/DOM.js';

class MainPage {
  constructor(router) {
    this.$navigation = $('#navigation');
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    this.$navigation.innerHTML = headerTemplate;
  }

  bindEvents() {
    this.$navigation.addEventListener('click', e => {
      e.preventDefault();

      const targetPath = e.target.dataset.navPath;
      this.router.navigate(targetPath);
    });
  }
}

export default MainPage;
