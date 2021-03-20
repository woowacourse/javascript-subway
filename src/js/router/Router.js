import { ROUTES, TYPE } from '../utils/constants';
import { request } from '../utils/request';

export default class Router {
  static instance;

  constructor(target) {
    if (Router.instance) {
      return Router.instance;
    }

    this.target = target;
    Router.instance = this;
  }

  async route(path) {
    history.pushState({ path }, null, path);
    await this.render(path);
  }

  async render(path) {
    const { url, title } = ROUTES[path];
    const template = await request({ uri: url, type: TYPE.TEXT });

    this.target.innerHTML = template;
    document.title = title;
  }
}
