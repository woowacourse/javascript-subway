import { MESSAGE } from './constants/messages.js';

const router = {
  routes: {},

  setRoute(path, page) {
    this.routes[path] = page;
  },

  navigate(path) {
    try {
      const targetPage = this.routes[path];

      if (!targetPage) {
        throw new Error(MESSAGE.ERROR.PAGE_NOT_FOUND);
      }

      targetPage.init();
      window.history.pushState({ path }, null, path);
    } catch (error) {
      console.error(error);
    }
  },
};

export default router;
