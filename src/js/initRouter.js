import { $ } from './utils/DOM.js';

function initRouter() {
  const mainBody = $('#main-body');
  const navigation = $('#nav');

  const routes = {
    '/': '../index.html',
    '/stations': '../../pages/stations.html',
    '/lines': '../../pages/lines.html',
    '/sections': '../../pages/sections.html',
  };

  const render = async path => {
    try {
      const url = routes[path];
      if (!url) {
        mainBody.innerHTML = `${path} Not Found`;
        return;
      }

      const res = await fetch(url);
      mainBody.innerHTML = await res.text();
    } catch (err) {
      console.error(err);
    }
  };

  window.addEventListener('popstate', e => {
    render(e.state.path);
  });

  navigation.addEventListener('click', e => {
    if (!e.target.matches('ul > li > a')) return;
    e.preventDefault();
    const path = e.target.getAttribute('href');
    window.history.pushState({ path }, null, path);
    render(path);
  });

  render('/');
}

export default initRouter;
