import { menuButtons, mainElements, modalElements } from './views';
import { $ } from '../@shared/utils';
import { store } from '../@shared/models/store';
import { linkButton } from '../@shared/views/templates/linkButton';
import { MENU, MESSAGE, ROUTE, STATE_KEY } from './constants/constants';
import { StationManage, LineManage, UserAuth, UserJoin, SectionManage } from './components';
import { hideModal } from './utils';

export class Subway {
  constructor() {
    this.cache = {
      stations: [],
      lines: [],
    };

    this.setup();
    this.selectDOM();
    this.mountChildComponents();
    this.bindEvent();
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
    new UserAuth({ cache: this.cache });
    new StationManage({ $modal: this.$modalContainer, cache: this.cache });
    new LineManage({ $modal: this.$modalContainer, cache: this.cache });
    new SectionManage({ $modal: this.$modalContainer, cache: this.cache });
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
