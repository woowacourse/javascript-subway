import { $ } from './utils/dom.js';
import { SELECTOR } from './constants/constants.js';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm.js';

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

export const components = {
  '/login': () => new LoginForm(),
  '/signup': () => new SignupForm(),
};

export const render = async (path) => {
  const url = routes[path];
  const res = await fetch(url);

  root.innerHTML = await res.text();
  const component = components[path]();
  component.init();
};

window.addEventListener('popstate', (e) => {
  render(e.state.path);
});
