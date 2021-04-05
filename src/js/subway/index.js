import { store } from '../@shared/models/store';
import { STATE_KEY } from './constants/constants';
import { DOM } from './constants/dom';
import { StationManage, LineManage, UserAuth, UserJoin, SectionManage } from './components';
import { hideModal } from './utils';
import { subwayView } from './views';
import { MapDisplay } from './components/MapDisplay';
import { Cache } from '../@shared/models/Cache';

export const cache = {
  stations: new Cache([]),
  lines: new Cache([]),
};

export class Subway {
  constructor() {
    this.#setup();
    this.#mountChildComponents();
    this.#bindEvent();
  }

  #setup() {
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(subwayView.renderRoot.bind(subwayView));
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(subwayView.renderNavButtons.bind(subwayView));
    store[STATE_KEY.ROUTE].subscribe(subwayView.renderMain.bind(subwayView));
    store[STATE_KEY.ROUTE].subscribe(subwayView.renderModal.bind(subwayView));
  }

  #mountChildComponents() {
    new UserJoin();
    new UserAuth();
    new StationManage();
    new LineManage();
    new SectionManage();
    new MapDisplay();
  }

  #bindEvent() {
    DOM.CONTAINER.MODAL.addEventListener('mousedown', this.#handleModalCloseButton.bind(this));
  }

  #handleModalCloseButton({ target }) {
    if (
      target === DOM.CONTAINER.MODAL ||
      target.parentNode.classList.contains('modal-close') ||
      target.classList.contains('close-x')
    ) {
      hideModal(DOM.CONTAINER.MODAL);
    }
  }
}
