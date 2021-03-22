export default class PageRouter {
  constructor() {
    this.route = {};

    this.init();
  }

  init() {
    window.addEventListener("popstate", (e) => {
      this.renderPageByPath(e.state.path);
    });
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
