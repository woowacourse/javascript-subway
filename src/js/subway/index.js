import { menuButtons, mainTemplate } from './views';
import { $ } from '../@shared/utils';
import { stateManager } from '../@shared/models/StateManager';
import { linkButton } from '../@shared/views/templates/linkButton';
import { MENU, ROUTE, STATE_KEY } from './constants/constants';

export class Subway {
  constructor(props) {
    this.props = props;
    this.setup();
    this.selectDOM();
    this.renderMenuButtons();
    this.renderSignButton();
    this.renderMain();
    this.mountChildComponents();
  }

  setup() {
    stateManager[STATE_KEY.IS_SIGNED].subscribe(this.renderMenuButtons.bind(this));
    stateManager[STATE_KEY.IS_SIGNED].subscribe(this.renderSignButton.bind(this));
    stateManager[STATE_KEY.ROUTE].subscribe(this.renderMain.bind(this));
  }

  selectDOM() {
    this.$menuContainer = $('#menu-buttons-container');
    this.$signContainer = $('#sign-button-container');
    this.$mainContainer = $('#main-container');
  }

  renderMenuButtons() {
    this.$menuContainer.innerHTML = stateManager[STATE_KEY.IS_SIGNED].get() ? menuButtons : '';
  }

  renderSignButton() {
    this.$signContainer.innerHTML = stateManager[STATE_KEY.IS_SIGNED].get()
      ? linkButton({ link: ROUTE.ROOT, text: MENU.SIGNOUT })
      : linkButton({ link: ROUTE.SIGNIN, text: MENU.SIGNIN });
  }

  renderMain() {
    this.$mainContainer.innerHTML = mainTemplate[stateManager[STATE_KEY.ROUTE].get()];
  }

  mountChildComponents() {}
}
