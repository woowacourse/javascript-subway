import '../css/index.css';
import { $ } from './@shared/utils/index';
import { stateManager } from './@shared/models/StateManager';
import { Subway } from './subway';
import { STATE_KEY } from './subway/constants/constants';

class App {
  constructor() {
    this.selectDOM();
    this.mountChildComponents();
    this.bindEvents();
  }

  selectDOM() {
    this.$app = $('#app');
  }

  mountChildComponents() {
    this.subway = new Subway();
  }

  bindEvents() {
    this.$app.addEventListener('click', event => {
      if (!event.target.classList.contains('js-link')) return;
      event.preventDefault();
      const path = event.target.dataset.link;

      history.pushState({ path }, null, path);
      stateManager[STATE_KEY.ROUTE].set(path);
    });
  }
}

window.addEventListener('popstate', event => {
  const path = event.state.path;

  stateManager[STATE_KEY.ROUTE].set(path);
});

window.addEventListener('load', () => {
  const app = new App();
  const path = location.pathname;

  stateManager[STATE_KEY.IS_SIGNED].set(false);
  stateManager[STATE_KEY.ROUTE].set(path);
});
