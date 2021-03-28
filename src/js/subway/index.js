import { menuButtons, mainElements, modalElements } from './views';
import { $ } from '../@shared/utils';
import { store } from '../@shared/models/store';
import { linkButton } from '../@shared/views/templates/linkButton';
import { DOM, MENU, MESSAGE, ROUTE, STATE_KEY } from './constants';
import { StationManage, LineManage, UserAuth, UserJoin, SectionManage } from './components';
import { hideModal } from './utils';

export class Subway {
  constructor() {
    this.cache = {
      stations: [],
      lines: [],
    };

    this.setup();
    this.mountChildComponents();
    this.bindEvent();
  }

  setup() {
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(this.renderRoot.bind(this));
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(this.renderNavButtons.bind(this));
    store[STATE_KEY.ROUTE].subscribe(this.renderMain.bind(this));
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

  mountChildComponents() {
    new UserJoin();
    new UserAuth({ cache: this.cache });
    new StationManage({ cache: this.cache });
    new LineManage({ cache: this.cache });
    new SectionManage({ cache: this.cache });
  }

  bindEvent() {
    this.$modalContainer.addEventListener('mousedown', this.handleModalCloseButton.bind(this));
  }

  handleModalCloseButton({ target }) {
    if (
      target === DOM.CONTAINER.MODAL ||
      target.parentNode.classList.contains('modal-close') ||
      target.classList.contains('close-x')
    ) {
      hideModal(DOM.CONTAINER.MODAL);
    }
  }
}
