import { menuButtons, contentElements } from './views';
import { $ } from '../@shared/utils';
import { store } from '../@shared/models/store';
import { linkButton } from '../@shared/views/templates/linkButton';
import { MENU, MESSAGE, ROUTE, STATE_KEY } from './constants/constants';
import { UserAuth, UserJoin } from './components';

export class Subway {
  constructor() {
    this.setup();
    this.selectDOM();
    this.mountChildComponents();
  }

  setup() {
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(this.renderRoot.bind(this));
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(this.renderNavButtons.bind(this));
    store[STATE_KEY.ROUTE].subscribe(this.renderContent.bind(this));
  }

  selectDOM() {
    this.$menuContainer = $('#menu-buttons-container');
    this.$signContainer = $('#sign-button-container');
    this.$mainContainer = $('#main-container');
  }

  renderRoot(signedUserName) {
    $('#root-message-box', contentElements[ROUTE.ROOT]).innerHTML = signedUserName
      ? MESSAGE.ROOT_GREETING(signedUserName)
      : MESSAGE.SIGNIN.REQUIRED;
  }

  renderNavButtons(signedUserName) {
    this.$menuContainer.innerHTML = signedUserName ? menuButtons : '';
    this.$signContainer.innerHTML = signedUserName
      ? linkButton({ link: ROUTE.SIGNOUT, text: MENU.SIGNOUT })
      : linkButton({ link: ROUTE.SIGNIN, text: MENU.SIGNIN });
  }

  renderContent(route) {
    this.$mainContainer.innerHTML = '';
    this.$mainContainer.appendChild(contentElements[route]);
  }

  mountChildComponents() {
    this.a = new UserJoin();
    this.b = new UserAuth();
    if (!this.a) throw new Error('a를 하는데 에러가 생겼다!');
    if (!this.b) throw new Error('b를 하는데 에러가 생겼다!');
  }
}
