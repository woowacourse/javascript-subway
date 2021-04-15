import Component from './Component';

class PageComponent extends Component {
  constructor({ parentNode, state, pathname }) {
    super({ parentNode, state });

    this.pathname = pathname;
  }

  render() {
    if (location.pathname !== this.pathname) return;

    this.renderSelf();
    this.addEventListeners();
  }
}

export default PageComponent;
