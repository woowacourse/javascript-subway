import { CLASS_SELECTOR } from './constants.js';
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
    router.routes[path].render();
    router.routes[path].initEvent();
  },

  init: () => {
    history.replaceState({ path: '/' }, null, '/');

    window.addEventListener('popstate', e => {
      router.render(e.state.path);
    });

    $('header').addEventListener('click', (event) => {
      event.preventDefault();

      const anchor = event.target.closest(`.${CLASS_SELECTOR.ANCHOR}`);

      if (!anchor) return;

      const path = anchor.getAttribute('href');

      history.pushState({ path }, null, path);
      router.render(path);
    });
  },
};

export default router;
