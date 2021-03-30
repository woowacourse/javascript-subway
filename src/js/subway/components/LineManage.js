import { store } from '../../subway/models/store';
import { getFromSessionStorage, hide, show } from '../../@shared/utils';
import {
  DOM,
  DOWN_STATION,
  MESSAGE,
  MIN_STATION_COUNT,
  NAME_LENGTH,
  SESSION_KEY,
  STATE_KEY,
  SUBMIT_TYPE,
  UP_STATION,
} from '../constants';
import { hideModal, isValidDistance, isValidDuration, isValidName, lineManageAPI, showModal } from '../utils';
import { subwayView } from '../views';
import { Component } from '../../@shared/models/Component';

export class LineManage extends Component {
  constructor() {
    super();
    this.submitType = null;
  }

  setup() {
    store[STATE_KEY.STATIONS].subscribe(this.updateStations.bind(this));
    store[STATE_KEY.LINES].subscribe(this.updateLines.bind(this));
  }

  async updateStations(stations) {
    subwayView.renderStationOptions(DOM.LINE.MODAL.UP_STATION_SELECTOR, UP_STATION, stations);
    subwayView.renderStationOptions(DOM.LINE.MODAL.DOWN_STATION_SELECTOR, DOWN_STATION, stations);
  }

  async updateLines(lines) {
    subwayView.renderLineList(lines);
  }

  bindEvent() {
    DOM.LINE.MAIN.ADD_MODAL_BUTTON.addEventListener('click', this.handleAddButton.bind(this));
    DOM.LINE.MAIN.LIST.addEventListener('click', this.handleModifyButton.bind(this));
    DOM.LINE.MODAL.NAME_INPUT.addEventListener('input', this.handleNameInput.bind(this));
    DOM.LINE.MODAL.FORM.addEventListener('submit', this.handleLineSubmit.bind(this));
    DOM.LINE.MODAL.PALETTE.addEventListener('click', this.handlePalette.bind(this));
    DOM.LINE.MAIN.LIST.addEventListener('click', this.handleRemoveButton.bind(this));
  }

  handleAddButton() {
    if (store[STATE_KEY.STATIONS].get().length < MIN_STATION_COUNT) {
      alert(MESSAGE.LINE_MANAGE.STAION_ADD_REQUIRED);

      return;
    }

    this.submitType = SUBMIT_TYPE.ADD;
    DOM.LINE.MODAL.MSG.innerText = '';
    show(...DOM.LINE.MODAL.NON_MODIFIABLE);
    showModal(DOM.CONTAINER.MODAL);
  }

  handleModifyButton({ target }) {
    if (!target.classList.contains('js-modify-button')) return;
    const line = target.closest('.js-line-list-item');

    this.submitType = SUBMIT_TYPE.MODIFY;
    DOM.LINE.MODAL.MSG.innerText = '';
    DOM.LINE.MODAL.FORM.dataset.lineId = line.dataset.id;
    DOM.LINE.MODAL.NAME_INPUT.value = line.dataset.name;
    DOM.LINE.MODAL.COLOR_INPUT.value = line.dataset.color;
    hide(...DOM.LINE.MODAL.NON_MODIFIABLE);
    showModal(DOM.CONTAINER.MODAL);
  }

  handleNameInput({ target: { value: lineName } }) {
    if (!isValidName(lineName, NAME_LENGTH.LINE_MIN, NAME_LENGTH.LINE_MAX)) {
      DOM.LINE.MODAL.MSG.innerText = MESSAGE.LINE_MANAGE.INVALID_NAME;

      return;
    }

    DOM.LINE.MODAL.MSG.innerText = '';
  }

  handlePalette(event) {
    if (!event.target.classList.contains('color-option')) return;
    DOM.LINE.MODAL.COLOR_INPUT.value = event.target.dataset.color;
  }

  handleLineSubmit(event) {
    event.preventDefault();
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

    if (this.submitType === SUBMIT_TYPE.ADD) {
      this.handleAddSubmit(accessToken);
    } else if (this.submitType === SUBMIT_TYPE.MODIFY) {
      this.handleModifySubmit(accessToken);
    }
  }

  async handleAddSubmit(accessToken) {
    const requestInfo = {
      id: DOM.LINE.MODAL.FORM.dataset.lineId,
      name: DOM.LINE.MODAL.NAME_INPUT.value,
      color: DOM.LINE.MODAL.COLOR_INPUT.value,
      upStationId: DOM.LINE.MODAL.UP_STATION_SELECTOR.value,
      downStationId: DOM.LINE.MODAL.DOWN_STATION_SELECTOR.value,
      distance: DOM.LINE.MODAL.DISTANCE_INPUT.value,
      duration: DOM.LINE.MODAL.DURATION_INPUT.value,
    };

    if (!isValidName(requestInfo.name, NAME_LENGTH.LINE_MIN, NAME_LENGTH.LINE_MAX)) return;
    if (requestInfo.upStationId === requestInfo.downStationId) {
      DOM.LINE.MODAL.MSG.innerText = MESSAGE.LINE_MANAGE.SAME_STATIONS;

      return;
    }
    if (!(isValidDistance(requestInfo.distance) && isValidDuration(requestInfo.duration))) {
      DOM.LINE.MODAL.MSG.innerText = MESSAGE.LINE_MANAGE.INVALID_DISTANCE_DURATION;

      return;
    }

    try {
      await lineManageAPI.addLine(accessToken, requestInfo);
      store[STATE_KEY.LINES].update();
      DOM.LINE.MODAL.FORM.reset();
      hideModal(DOM.CONTAINER.MODAL);
    } catch (error) {
      DOM.LINE.MODAL.MSG.innerText = error.message === '400' ? MESSAGE.LINE_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  async handleModifySubmit(accessToken) {
    const requestInfo = {
      id: DOM.LINE.MODAL.FORM.dataset.lineId,
      name: DOM.LINE.MODAL.NAME_INPUT.value,
      color: DOM.LINE.MODAL.COLOR_INPUT.value,
    };

    if (!isValidName(requestInfo.name, NAME_LENGTH.LINE_MIN, NAME_LENGTH.LINE_MAX)) return;

    try {
      await lineManageAPI.modifyLine(accessToken, requestInfo);
      store[STATE_KEY.LINES].update();
      DOM.LINE.MODAL.FORM.reset();
      hideModal(DOM.CONTAINER.MODAL);
    } catch (error) {
      DOM.LINE.MODAL.MSG.innerText = error.message === '400' ? MESSAGE.LINE_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  async handleRemoveButton({ target }) {
    if (!target.classList.contains('js-remove-button')) return;
    const $line = target.closest('.js-line-list-item');
    const requestInfo = {
      id: $line.dataset.id,
    };

    if (!confirm(MESSAGE.CONFIRM.LINE_REMOVE)) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      await lineManageAPI.removeLine(accessToken, requestInfo);
      store[STATE_KEY.LINES].update();
    } catch (error) {
      console.error(error.message);
    }
  }
}
