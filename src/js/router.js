import { ID_SELECTOR, CLASS_SELECTOR } from './constants.js';
import $ from './utils/querySelector.js';
import HomeComponent from './components/HomeComponent.js';
import LoginComponent from './components/LoginComponent.js';
import SignupComponent from './components/SignupComponent.js';

const router = {
  routes: {
    '/': new HomeComponent({}),
    '/pages/login.html': new LoginComponent({}),
    '/pages/signup.html': new SignupComponent({}),
  },

  render: async path => {
    router.routes[path].initEvent();
    router.routes[path].render();
  },

  init: () => {
    history.replaceState({ path: '/' }, null, '/');

    window.addEventListener('popstate', e => {
      router.render(e.state.path);
    });

    $(`#${ID_SELECTOR.APP}`).addEventListener('click', e => {
      e.preventDefault();

      const anchor = e.target.closest(`.${CLASS_SELECTOR.ANCHOR}`);

      if (!anchor) return;

      const path = anchor.getAttribute('href');

      history.pushState({ path }, null, path);
      router.render(path);
    });
  },
};

export default router;
