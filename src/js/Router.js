import Cookies from 'js-cookie';

import { PATH } from './constants/path.js';
import { MESSAGE } from './constants/messages.js';
import { COOKIE_KEY } from './constants/constants.js';

const router = {
  routes: {},
  pages: {},

  init(pages) {
    this.pages = pages;
    this.routes = {
      [PATH.ROOT]: null,
      [PATH.SIGNUP]: pages.signupPage,
      [PATH.STATIONS]: pages.stationsPage,
      [PATH.LINES]: pages.linesPage,
      [PATH.SECTIONS]: pages.sectionsPage,
      [PATH.MAP]: pages.mapPage,
    };

    this.back();
    this.navigate(PATH.ROOT);
  },

  checkMainRoute() {
    this.routes[PATH.ROOT] = this.userToken
      ? this.pages.mainPage
      : this.pages.loginPage;
  },

  navigate(path) {
    this.userToken = Cookies.get(COOKIE_KEY.JWT_TOKEN);

    if (path === PATH.ROOT) {
      this.checkMainRoute();
    }

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

  back() {
    window.addEventListener('popstate', e => {
      if (!e.state) return;

      this.navigate(e.state.path);
    });
  },
};

export default router;
