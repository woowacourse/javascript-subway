import '../css/index.css';
import initRouter from './routes.js';
import { $ } from './utils/dom.js';
import handleRouteNavigation from './eventHandlers/handleRouteNavigation';

const initAppEvent = () => {
  $('#header').addEventListener('click', handleRouteNavigation);
};

initRouter();
initAppEvent();
