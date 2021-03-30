import { store } from '../subway/models/store';
import { DOM, STATE_KEY } from './constants';
import { StationManage, LineManage, UserAuth, UserJoin, SectionManage } from './components';
import { hideModal } from './utils';
import { subwayView } from './views';
import { Component } from '../@shared/models/Component';

export class Subway extends Component {
  setup() {
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(subwayView.renderRoot.bind(subwayView));
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(subwayView.renderNavButtons.bind(subwayView));
    store[STATE_KEY.ROUTE].subscribe(subwayView.renderMain.bind(subwayView));
    store[STATE_KEY.ROUTE].subscribe(subwayView.renderModal.bind(subwayView));
  }

  mountChildComponents() {
    new UserJoin();
    new UserAuth();
    new StationManage();
    new LineManage();
    new SectionManage();
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
