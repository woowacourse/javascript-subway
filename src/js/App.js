import Router from './router.js';
import Header from './layouts/Header.js';

class App {
  constructor() {
    this.components = {};
  }

  init() {
    this.router = new Router();
    this.router.init();

    // layout들 렌더링 요청. (layout들의 init 수행.)
    this.header = new Header({ switchURL: this.switchURL.bind(this) }); //getHistory 필요
    this.header.init();
  }

  switchURL(href) {
    this.router.getHistory(href);
  }

  mountComponent() {
    this.components = {
      lines: new Lines(),
    };
    //this.liens = new Lines()
  }

  renderComponent(key) {
    this.components[key].init();
  }
}

export default App;
