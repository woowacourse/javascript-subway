import { store } from '../@shared/models/store';
import { STATE_KEY } from './constants/constants';
import { DOM } from './constants/dom';
import { StationManage, LineManage, UserAuth, UserJoin, SectionManage } from './components';
import { hideModal } from './utils';
import { subwayView } from './views';

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
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(subwayView.renderRoot.bind(subwayView));
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(subwayView.renderNavButtons.bind(subwayView));
    store[STATE_KEY.ROUTE].subscribe(subwayView.renderMain.bind(subwayView));
  }

  mountChildComponents() {
    new UserJoin();
    new UserAuth({ cache: this.cache });
    new StationManage({ cache: this.cache });
    new LineManage({ cache: this.cache });
    new SectionManage({ cache: this.cache });
  }

  bindEvent() {
    DOM.CONTAINER.MODAL.addEventListener('mousedown', this.handleModalCloseButton.bind(this));
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
