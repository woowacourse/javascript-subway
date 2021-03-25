import { menuButtons, mainElements, modalElements } from './views';
import { $ } from '../@shared/utils';
import { stateManager } from '../@shared/models/StateManager';
import { linkButton } from '../@shared/views/templates/linkButton';
import { MENU, MESSAGE, ROUTE, STATE_KEY } from './constants/constants';
import { StationManage, UserAuth, UserJoin } from './components';
import { hideModal } from './utils';
import { LineManage } from './components/LineManage';

export class Subway {
  constructor() {
    this.setup();
    this.selectDOM();
    this.mountChildComponents();
    this.bindEvent();
  }

  setup() {
    stateManager[STATE_KEY.SIGNED_USER].subscribe(this.renderRoot.bind(this));
    stateManager[STATE_KEY.SIGNED_USER].subscribe(this.renderNavButtons.bind(this));
    stateManager[STATE_KEY.ROUTE].subscribe(this.renderMain.bind(this));
    stateManager[STATE_KEY.ROUTE].subscribe(this.renderModal.bind(this));
  }

  renderRoot(signedUser) {
    $('#root-message-box', mainElements[ROUTE.ROOT]).innerHTML = signedUser
      ? MESSAGE.ROOT_GREETING(signedUser)
      : MESSAGE.SIGNIN.REQUIRED;
  }

  renderNavButtons(signedUser) {
    this.$menuContainer.innerHTML = signedUser ? menuButtons : '';
    this.$signContainer.innerHTML = signedUser
      ? linkButton({ link: ROUTE.SIGNOUT, text: MENU.SIGNOUT })
      : linkButton({ link: ROUTE.SIGNIN, text: MENU.SIGNIN });
  }

  renderMain(route) {
    this.$mainContainer.innerHTML = '';
    this.$mainContainer.appendChild(mainElements[route]);
  }

  renderModal(route) {
    if (!modalElements[route]) return;
    this.$modalContainer.innerHTML = '';
    this.$modalContainer.appendChild(modalElements[route]);
  }

  selectDOM() {
    this.$menuContainer = $('#menu-buttons-container');
    this.$signContainer = $('#sign-button-container');
    this.$mainContainer = $('#main-container');
    this.$modalContainer = $('#modal-container');
  }

  mountChildComponents() {
    new UserJoin();
    new UserAuth();
    new StationManage({ $modal: this.$modalContainer });
    new LineManage({ $modal: this.$modalContainer });
  }

  bindEvent() {
    this.$modalContainer.addEventListener('mousedown', this.handleModalCloseButton.bind(this));
  }

  handleModalCloseButton({ target }) {
    if (
      target === this.$modalContainer ||
      target.parentNode.classList.contains('modal-close') ||
      target.classList.contains('close-x')
    ) {
      hideModal(this.$modalContainer);
    }
  }
}
