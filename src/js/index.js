import { $ } from './utils/index.js';
import { goTo, handleLinkClick, handleWindowPopstate } from './router/index.js';
import { isLoggedIn } from './auth/index.js';
import { PATHNAMES } from './constants/index.js';

import '../css/index.css';

const $app = $('#app');
$app.addEventListener('click', handleLinkClick);
window.addEventListener('popstate', handleWindowPopstate);

goTo(isLoggedIn() ? PATHNAMES.STATIONS : PATHNAMES.HOME);
