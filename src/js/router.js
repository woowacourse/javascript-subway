import { render } from './renderer.js';

class Router {
  constructor() {
    this._handlePopState();
  }

  renderPage(href, info) {
    const { title = '', contents } = info;
    history.pushState({ contents }, title, href);
    render();
  }

  _handlePopState() {
    window.addEventListener('popstate', () => {
      render();
    });
  }
}

export default Router;
