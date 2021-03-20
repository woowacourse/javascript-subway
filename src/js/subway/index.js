import { menuButtons, contentElements } from './views';
import { $ } from '../@shared/utils';
import { stateManager } from '../@shared/models/StateManager';
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
    stateManager[STATE_KEY.SIGNED_USER].subscribe(this.renderRoot.bind(this));
    stateManager[STATE_KEY.SIGNED_USER].subscribe(this.renderNavButtons.bind(this));
    stateManager[STATE_KEY.ROUTE].subscribe(this.renderContent.bind(this));
  }

  selectDOM() {
    this.$menuContainer = $('#menu-buttons-container');
    this.$signContainer = $('#sign-button-container');
    this.$mainContainer = $('#main-container');
  }

  renderRoot(signedUser) {
    // TODO: UI 변경과 선택자 부여
    $('p', contentElements[ROUTE.ROOT]).innerHTML = signedUser
      ? MESSAGE.ROOT_GREETING(signedUser)
      : MESSAGE.SIGNIN.REQUIRED;
  }

  renderNavButtons(signedUser) {
    this.$menuContainer.innerHTML = signedUser ? menuButtons : '';
    this.$signContainer.innerHTML = signedUser
      ? linkButton({ link: ROUTE.SIGNOUT, text: MENU.SIGNOUT })
      : linkButton({ link: ROUTE.SIGNIN, text: MENU.SIGNIN });
  }

  renderContent(route) {
    this.$mainContainer.innerHTML = '';
    this.$mainContainer.appendChild(contentElements[route]);
  }

  mountChildComponents() {
    this.userJoin = new UserJoin();
    this.userAuth = new UserAuth();
  }
}
