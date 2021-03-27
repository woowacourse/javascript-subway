import '../css/index.css';
import handleRoute from './eventHandlers/handleRoute';
import handleLogout from './eventHandlers/handleLogout';
import initRouter from './routes';
import { initStore } from './store';
import { $ } from './utils/dom';

const initAppEvent = () => {
  $('#header').addEventListener('click', handleRoute);
  $('#logout-nav-button').addEventListener('click', handleLogout);
};

const init = async () => {
  await initStore();
  initAppEvent();
  initRouter();
};

init();
