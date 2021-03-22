import Component from './Component';

class Page extends Component {
  constructor(props) {
    super(props);
    //TODO: this.state?.url 예외 처리 해주기
  }

  initialRoute(path) {
    history.replaceState({ path: '/' }, null, '/');
    this.route(path, false);
  }

  route = (path, shouldPushState = true) => {
    if (shouldPushState) {
      history.pushState({ path }, null, path);
    }

    this.url[path].render();
    this.url[path].initEvent();
  };
}

export default Page;
