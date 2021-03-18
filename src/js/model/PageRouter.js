export default class PageRouter {
  constructor() {
    this.route = {};
  }

  registerRoute({ path, handler }) {
    this.route = { ...this.route, [path]: handler };
  }

  renderPageByPath(path) {
    this.route[path]();
  }

  movePage(path, title = "") {
    window.history.pushState({ path }, title, path);
    this.renderPageByPath(path);
  }
}
