import '../css/index.css';
import initRouter from './routes/index.js';
import { $ } from './utils/dom.js';
import handleRoute from './eventHandlers/handleRoute';
import initStore from './store';
import handleLogout from './eventHandlers/handleLogout';

const initAppEvent = () => {
  $('#header').addEventListener('click', handleRoute);
  $('#logout-nav-button').addEventListener('click', handleLogout);
};

const init = () => {
  initAppEvent();
  initRouter();
  initStore();
};

init();
