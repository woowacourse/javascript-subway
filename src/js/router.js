import { $ } from './utils/dom.js';
import { SELECTOR } from './constants/constants.js';

const root = $(SELECTOR.CONTENT);

export const routes = {
  '/': '/pages/entry.html',
  '/stations': './pages/stations.html',
  '/lines': './pages/lines.html',
  '/sections': '/pages/sections.html',
  '/map': './pages/map.html',
  '/search': './pages/search.html',
  '/signup': './pages/signup.html',
  '/login': './pages/login.html',
};

const getAvailablePath = (path, isLoggedIn) => {
  if (!routes[path]) return '/';

  if (isLoggedIn) {
    if (path === '/login' || path === '/signup') return '/stations';

    return path;
  } else {
    if (path === '/login' || path === '/signup') return path;

    return '/';
  }
};

export const render = async (path, isLoggedIn) => {
  const availablePath = getAvailablePath(path, isLoggedIn);
  const url = routes[availablePath];

  const res = await fetch(url);
  root.innerHTML = await res.text();

  history.pushState(
    { path: availablePath, isLoggedIn: isLoggedIn },
    null,
    availablePath
  );
};

window.addEventListener('popstate', async (e) => {
  await render(e.state.path, e.state.isLoggedIn);
});
