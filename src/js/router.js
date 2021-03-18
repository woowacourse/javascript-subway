import { ID_SELECTOR, CLASS_SELECTOR } from './constants.js';
import $ from './utils/querySelector.js';
import HOME_TEMPLATE from './templates/homeTemplate.js';
import LINES_TEMPLATE from './templates/linesTemplate.js';

const router = {
  routes: {
    '/': HOME_TEMPLATE,
    '/pages/lines.html': LINES_TEMPLATE,
  },

  render: async path => {
    const { TITLE, MAIN, MODAL } = router.routes[path];

    $('title').innerHTML = TITLE;
    $(`#${ID_SELECTOR.MAIN}`).innerHTML = MAIN;
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = MODAL ? MODAL : '';
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
