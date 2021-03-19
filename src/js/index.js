import { $ } from './utils/index.js';
import { handleLinkClick, handleWindowPopstate } from './router/index.js';
import { renderHeader, renderHome } from './views/index.js';
import '../css/index.css';

const $app = $('#app');
$app.addEventListener('click', handleLinkClick);
window.addEventListener('popstate', handleWindowPopstate);

renderHeader();
renderHome();
