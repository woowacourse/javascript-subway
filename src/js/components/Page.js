import Component from './Component';

class Page extends Component {
  constructor(props) {
    super(props);
    //TODO: this.state?.url 예외 처리 해주기
  }

  route = path => {
    history.pushState({ path }, null, path);

    this.state.url[path].render();
    this.state.url[path].initEvent();
  };
}

export default Page;
