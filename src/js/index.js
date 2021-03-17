import '../css/index.css';
import { Subway } from './subway';
import { UserManage } from './userManage';
import { $ } from './@shared/utils/dom.js';

class App {
  constructor() {
    this.state = {
      isSigned: false,
    };
  }

  run() {
    this.mount();
  }

  mount() {
    this.userManage = new UserManage({ isSigned: this.state.isSigned });
    this.subway = new Subway({ isSigned: this.state.isSigned });
  }
}

window.addEventListener('load', () => {
  const app = new App($('#app'));

  app.run();
});
