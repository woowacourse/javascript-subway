import { menuButtons, mainTemplate } from './views';
import { $ } from '../@shared/utils';
import { stateManager } from '../@shared/models/StateManager';
import { linkButton } from '../@shared/views/templates/linkButton';

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
    stateManager['isSigned'].subscribe(this.renderMenuButtons.bind(this));
    stateManager['isSigned'].subscribe(this.renderSignButton.bind(this));
    stateManager['route'].subscribe(this.renderMain.bind(this));
  }

  selectDOM() {
    this.$menuContainer = $('#menu-buttons-container');
    this.$signContainer = $('#sign-button-container');
    this.$mainContainer = $('#main-container');
  }

  renderMenuButtons() {
    this.$menuContainer.innerHTML = stateManager['isSigned'].get() ? menuButtons : '';
  }

  renderSignButton() {
    this.$signContainer.innerHTML = stateManager['isSigned'].get()
      ? linkButton({ link: '#', text: '❎ 로그아웃' })
      : linkButton({ link: '#signin', text: '✅ 로그인' });
  }

  renderMain() {
    this.$mainContainer.innerHTML = mainTemplate[stateManager['route'].get()];
  }

  mountChildComponents() {}
}
