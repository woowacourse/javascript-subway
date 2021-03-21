import { PATH } from '../constants';

export default class Router {
  #registration = {};

  initRouteEvent() {
    window.addEventListener('popstate', e => {
      this.#handlePopState.call(this, e);
    });
    history.replaceState({ path: PATH.ROOT }, null, PATH.ROOT);
    this.navigate(PATH.ROOT);
  }

  register(path, component) {
    if (!this.#registration[path]) {
      this.#registration[path] = [component];
      return;
    }
    this.#registration[path].push(component);
  }

  async navigate(path) {
    this.#registration[path].forEach(component => {
      component.renderPage();
      component.renderComponent();
    });
  }

  #handlePopState(e) {
    const path = e.state.path;
    this.navigate(path);
  }
}
