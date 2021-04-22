import { render } from './renderer.js';

class Router {
  constructor() {
    this._bindPopStateEvent();
  }

  renderPage(href, info) {
    const { title = '', contents } = info;
    history.pushState({ contents }, title, href);
    render();
  }

  _bindPopStateEvent() {
    window.addEventListener('popstate', () => {
      render();
    });
  }
}

export default Router;
