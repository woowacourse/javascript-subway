import { menuButtons, contentTemplate } from './views';
import { $ } from '../@shared/utils';
import { stateManager } from '../@shared/models/StateManager';
import { linkButton } from '../@shared/views/templates/linkButton';
import { MENU, ROUTE, STATE_KEY } from './constants/constants';

export class Subway {
  constructor(props) {
    this.props = props;
    this.setup();
    this.selectDOM();
    this.renderNavButtons();
    this.mountChildComponents();
  }

  setup() {
    stateManager[STATE_KEY.IS_SIGNED].subscribe(this.renderNavButtons.bind(this));
    stateManager[STATE_KEY.ROUTE].subscribe(this.renderContent.bind(this));
  }

  selectDOM() {
    this.$menuContainer = $('#menu-buttons-container');
    this.$signContainer = $('#sign-button-container');
    this.$mainContainer = $('#main-container');
  }

  renderNavButtons(isSigned) {
    this.$menuContainer.innerHTML = isSigned ? menuButtons : '';
    this.$signContainer.innerHTML = isSigned
      ? linkButton({ link: ROUTE.ROOT, text: MENU.SIGNOUT })
      : linkButton({ link: ROUTE.SIGNIN, text: MENU.SIGNIN });
  }

  renderContent(route) {
    this.$mainContainer.innerHTML = contentTemplate[route];
  }

  mountChildComponents() {}
}
