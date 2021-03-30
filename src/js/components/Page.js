import Component from './Component';

class Page extends Component {
  // TODO: default value 설정
  _routingUrl;
  #initialUrl;

  constructor(props) {
    super(props);

    this.#initialUrl = window.location.href.slice(0, -1);
  }

  initialRoute(path) {
    const actualPath = this.#initialUrl + path;

    history.replaceState({ path: actualPath }, null, actualPath);
    this.route(path, false);
  }

  route = (path, shouldPushState = true) => {
    if (!this._routingUrl) {
      console.error('Page 인스턴스에 url이 정의되어 있지 않습니다.');
    }

    if (shouldPushState) {
      const actualPath = this.#initialUrl + path;
      history.pushState({ path: actualPath }, null, actualPath);
    }

    this._routingUrl[path].render();
    this._routingUrl[path].initEvent();
  };
}

export default Page;
