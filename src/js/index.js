import '../css/index.css';
import { Subway } from './subway';

class App {
  run() {
    this.mountChildComponents();
  }

  mountChildComponents() {
    this.subway = new Subway();
  }
}

window.addEventListener('load', () => {
  const app = new App();

  app.run();
});
