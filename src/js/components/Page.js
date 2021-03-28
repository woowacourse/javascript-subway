import Component from './Component';

class Page extends Component {
  _router;
  #initialUrl;

  constructor(props) {
    super(props);

    this.#initialUrl = window.location.href.slice(0, -1);
  }

  initialize() {
    super.initialize();
    this.initRouter();
  }

  initRouter() {}

  initialRoute(path) {
    const actualPath = this.#initialUrl + path;

    history.replaceState({ path: actualPath }, null, actualPath);
    this.route(path, false);
  }

  route = (path, shouldPushState = true) => {
    if (!this._router) {
      alert('Page 인스턴스에 _router가 정의되어 있지 않습니다.');
    }

    if (shouldPushState) {
      const actualPath = this.#initialUrl + path;
      history.pushState({ path: actualPath }, null, actualPath);
    }

    this._router[path].render();
    this._router[path].initialize();
  };
}

export default Page;
