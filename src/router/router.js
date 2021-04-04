import { PATH } from '../constants';

const pageComponents = {}

const router = {
  initRouteEvent() {
    window.addEventListener('popstate', e => {
      router.navigate(e.state.path);
    });
    history.replaceState({ path: PATH.ROOT }, null, PATH.ROOT);
    router.navigate(PATH.ROOT);
  },

  register(path, component) {
    if (!pageComponents[path]) {
      pageComponents[path] = [component];
      return;
    }
    pageComponents[path].push(component);
  },

  navigate(path) {
    pageComponents[path].forEach(component => {
      if (component.renderPage) {
        component.renderPage();
      }
      component.renderComponent();
    });
  }
}

export default router;