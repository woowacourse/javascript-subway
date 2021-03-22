import Component from './Component';

class Page extends Component {
  url;

  constructor(props) {
    super(props);
  }

  initialRoute(path) {
    history.replaceState({ path: '/' }, null, '/');
    this.route(path, false);
  }

  route = (path, shouldPushState = true) => {
    if (!this.url) {
      alert('Page 인스턴스에 url이 정의되어 있지 않습니다.');
    }

    if (shouldPushState) {
      history.pushState({ path }, null, path);
    }

    this.url[path].render();
    this.url[path].initEvent();
  };
}

export default Page;
