class Router {
  constructor() {
    this.pageComponents;
  }

  async goPage(path) {
    history.pushState({ path }, null, path);
    this.renderComponent(path);
  }

  async renderComponent(path = location.pathname) {
    const component = this.route[path]();

    component.render();
    await component.updateSubwayState?.();
    // try {
    //   await component.updateSubwayState?.();
    // } catch (error) {
    //   if (error instanceof ExpiredTokenError) {
    //     this.setIsLogin(false);
    //     Router.goPage(UNAUTHENTICATED_LINK.LOGIN);
    //   }
    //   console.error(error.message);
    // }
  }
}
// const router = new Router();
export default new Router();
