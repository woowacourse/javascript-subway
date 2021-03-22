import { PATH } from '../constants';

const registration = {}

const router = {
  initRouteEvent() {
    window.addEventListener('popstate', e => {
      router.navigate(e.state.path);
    });
    history.replaceState({ path: PATH.ROOT }, null, PATH.ROOT);
    router.navigate(PATH.ROOT);
  },

  register(path, component) {
    if (!registration[path]) {
      registration[path] = [component];
      return;
    }
    router.registration[path].push(component);
  },

  navigate(path) {
    registration[path].forEach(component => {
      component.renderPage();
      component.renderComponent();
    });
  }
}

export default router;