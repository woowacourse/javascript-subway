import '../css/index.css';
import View from './views/View';
import initRouter from './initRouter.js';

const view = new View();
view.init();
initRouter();
