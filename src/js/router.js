import { $ } from './utils/dom.js';
import { SELECTOR } from './constants/constants.js';

// TODO: root 선언을 다른 곳에서 해야 할 것 같다.
const root = $(SELECTOR.CONTENT);

export const routes = {
  '/': '/pages/entry.html',
  '/stations': './pages/stations.html',
  '/lines': './pages/lines.html',
  '/sections': '/pages/sections.html',
  '/map': './pages/map.html',
  '/search': './pages/search.html',
  '/login': './pages/login.html',
};

export const render = async (path) => {
  const url = routes[path];
  const res = await fetch(url);

  root.innerHTML = await res.text();
};

window.addEventListener('popstate', (e) => {
  render(e.state.path);
});
