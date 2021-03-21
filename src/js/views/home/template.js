import { isLoggedIn } from '../../auth.js';
import { AUTH_MESSAGES } from '../../constants/index.js';
import subwayEmoji from '../../../images/subway_emoji.png';

const HOME_TEMPLATE = `<div class="d-flex flex-col">
<div class="d-flex justify-center">
  <img src="${subwayEmoji}" width="200" />
</div>
<p class="mt-0 text-center">${isLoggedIn() ? AUTH_MESSAGES.WELCOME : AUTH_MESSAGES.LOGIN_IS_REQUIRED}</p>
</div>`;

export default HOME_TEMPLATE;
