import { Component } from '../../@shared/models/Component';
import { DOM, STATE_KEY } from '../constants';
import { store } from '../models/store';
import { showModal } from '../utils';
import { subwayView } from '../views';

export class MapDisplay extends Component {
  setup() {
    store[STATE_KEY.LINES].subscribe(this.updateLines.bind(this));
  }

  updateLines(lines) {
    subwayView.renderLineButtonList(lines);
  }

  bindEvent() {
    DOM.MAP.MAIN.LIST.addEventListener('click', this.handleLineButton.bind(this));
  }

  handleLineButton({ target }) {
    if (!target.classList.contains('js-line-modal-button')) return;
    const line = target.closest('.js-line-list-item');
    const lineId = Number(line.dataset.id);
    const { sections } = store[STATE_KEY.LINES].get().find(line => line.id === lineId);

    DOM.MAP.MODAL.LIST.dataset.color = line.dataset.color;
    subwayView.renderLineName(line.dataset.name);
    subwayView.renderLine(sections);
    showModal(DOM.CONTAINER.MODAL);
  }
}
