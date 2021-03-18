import { ID_SELECTOR, CLASS_SELECTOR } from './constants.js';
import $ from './utils/querySelector.js';

const router = {
  routes: {
    '/': '/data/home.json',
    '/pages/stations.html': '/data/station.json',
  },

  render: async path => {
    const url = router.routes[path];
    const res = await fetch(url);
    const { contents } = await res.json();

    $(`#${ID_SELECTOR.MAIN}`).innerHTML = contents;
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
