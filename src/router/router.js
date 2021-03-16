import { SELECTOR_ID } from '../constants.js';
import ROUTES from './routes.js';
import { $ } from '../utils/querySelector.js';

export default class Router {
  initRouteEvent() {
    window.addEventListener('popstate', e => {
      this.#handlePopState.call(this, e);
    });
    history.pushState({ path: '/' }, null, '/');
  }

  async navigate(path) {
    const targetPath = ROUTES[path] ? ROUTES[path] : '/';
    const response = await fetch(targetPath);
    const data = await response.text();
    $(`#${SELECTOR_ID.MAIN_CONTAINER}`).innerHTML = data;
  }

  #handlePopState(e) {
    const path = e.state.path;
    this.navigate(path);
  }
}
