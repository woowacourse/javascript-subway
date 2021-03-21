import { $ } from './utils/index.js';
import { goTo, handleLinkClick, handleWindowPopstate } from './router/index.js';
import { isLoggedIn } from './auth.js';
import ROUTES from './constants/routes.js';

import '../css/index.css';

const $app = $('#app');
$app.addEventListener('click', handleLinkClick);
window.addEventListener('popstate', handleWindowPopstate);

goTo(isLoggedIn() ? ROUTES.STATIONS : ROUTES.HOME);
