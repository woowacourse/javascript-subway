import '../css/index.css';
import { Subway } from './subway';
import { UserManage } from './userManage';

class App {
  constructor() {
    this.state = {
      isSigned: true,
    };
  }

  run() {
    this.mountChildComponents();
  }

  mountChildComponents() {
    this.userManage = new UserManage({ isSigned: this.state.isSigned });
    this.subway = new Subway({ isSigned: this.state.isSigned });
  }
}

window.addEventListener('load', () => {
  const app = new App();

  app.run();
});
