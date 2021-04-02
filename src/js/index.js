import '../css/index.css';
import { $ } from './utils/dom';
import { closeModal } from './utils/modal';
import initRouter from './routes';
import { initStore } from './store';
import handleRoute from './eventHandlers/handleRoute';
import handleLogout from './eventHandlers/handleLogout';

const initAppEvent = () => {
  $('#header').addEventListener('click', handleRoute);
  $('#logout-nav-button').addEventListener('click', handleLogout);

  window.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeModal($('.modal.open'));
  });
};

const init = async () => {
  await initStore();

  initAppEvent();
  initRouter();
};

init();
