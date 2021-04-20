class Router {
  constructor() {
    this.route = {};
  }

  async goPage(path) {
    history.pushState({ path }, null, path);
    this.renderComponent(path);
  }

  async renderComponent(path = location.pathname) {
    const component = this.route[path]();

    component.render();
    await component.updateSubwayState?.();
  }
}
export default new Router();
