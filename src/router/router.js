import { SELECTOR_ID } from '../constants.js';
import ROUTES from './routes.js';
import { $ } from '../utils/querySelector.js';

// TODO : subscription 을 State 로 옮기고 라우터가 State 를 받도록 변경
export default class Router {
  #registration = {};

  initRouteEvent() {
    window.addEventListener('popstate', e => {
      this.#handlePopState.call(this, e);
    });
    history.replaceState({ path: '/' }, null, '/');
  }

  register(path, component) {
    if (!this.#registration[path]) {
      this.#registration[path] = [component];
      return;
    }
    this.#registration[path].push(component);
  }

  async navigate(path) {
    const targetPath = ROUTES[path] ? ROUTES[path] : '/pages/main.html';
    const response = await fetch(targetPath);
    const data = await response.text();

    $(`#${SELECTOR_ID.MAIN_CONTAINER}`).innerHTML = data;
    this.#registration[path].forEach(component => {
      component.createComponent();
    });
  }

  #handlePopState(e) {
    const path = e.state.path;
    this.navigate(path);
  }
}
