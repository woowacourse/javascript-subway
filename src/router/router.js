import { PATH } from '../constants';

const pageComponents = {};

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
      component.renderPage && component.renderPage();
      component.renderComponent();
      component.initEvents && component.initEvents();
    });
  },

  pushState(path) {
    history.pushState({ path }, null, path);
  },
};

export default router;
