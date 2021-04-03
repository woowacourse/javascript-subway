import { PATH } from '../constants';

export default class Router {
  #reRenderComponentRegistration  = {};

  initRouteEvent() {
    window.addEventListener('popstate', e => {
      this.#handlePopState.call(this, e);
    });
    history.replaceState({ path: PATH.ROOT }, null, PATH.ROOT);
    this.navigate(PATH.ROOT);
  }

  register(path, component) {
    if (!this.#reRenderComponentRegistration [path]) {
      this.#reRenderComponentRegistration [path] = [component];
      return;
    }
    this.#reRenderComponentRegistration [path].push(component);
  }

  async navigate(path) {
    this.#reRenderComponentRegistration [path].forEach(component => {
      component.renderPage();
      component.renderComponent();
    });
  }

  #handlePopState(e) {
    const path = e.state.path;
    this.navigate(path);
  }
}
