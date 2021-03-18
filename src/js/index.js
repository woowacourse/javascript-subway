import '../css/index.css';
import '../images/subway_emoji.png';
import { init } from './router.js';
import { headerTemplate } from './templates/layouts/header.js';

document.querySelector('header').innerHTML = headerTemplate('tkeon');

init();
