import { store } from '../../@shared/models/store';
import { getFromSessionStorage, hide, show } from '../../@shared/utils';
import { DOM } from '../constants/dom';
import {
  DOWN_STATION,
  MESSAGE,
  NAME_LENGTH,
  ROUTE,
  SESSION_KEY,
  STATE_KEY,
  SUBMIT_TYPE,
  UP_STATION,
} from '../constants/constants';
import {
  hideModal,
  isValidDistance,
  isValidDuration,
  isValidName,
  lineManageAPI,
  showModal,
  stationManageAPI,
} from '../utils';
import { subwayView } from '../views';

export class LineManage {
  constructor(props) {
    this.props = props;
    this.submitType = null;
    this.setup();
    this.bindEvent();
  }

  setup() {
    store[STATE_KEY.ROUTE].subscribe(this.updateStationOptions.bind(this));
    store[STATE_KEY.SIGNED_USER_NAME].subscribe(this.updateLines.bind(this));
  }

  async updateStationOptions(route) {
    if (route !== ROUTE.LINES) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      if (this.props.cache.stations.length === 0) {
        this.props.cache.stations = await stationManageAPI.getStations(accessToken);
      }

      subwayView.renderStationOptions(DOM.LINE.MODAL.UP_STATION_SELECTOR, UP_STATION, this.props.cache.stations);
      subwayView.renderStationOptions(DOM.LINE.MODAL.DOWN_STATION_SELECTOR, DOWN_STATION, this.props.cache.stations);
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateLines() {
    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      if (this.props.cache.lines.length === 0) {
        this.props.cache.lines = await lineManageAPI.getLines(accessToken);
      }

      subwayView.renderLineList(this.props.cache.lines);
    } catch (error) {
      console.error(error.message);
    }
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
      this.props.cache.lines = [];
      await this.updateLines(ROUTE.LINE);
      DOM.LINE.MODAL.FORM.reset();
      hideModal(DOM.CONTAINER.MODAL);
    } catch (error) {
      console.error(error.message);
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
      this.props.cache.lines = [];
      await this.updateLines();
      DOM.LINE.MODAL.FORM.reset();
      hideModal(DOM.CONTAINER.MODAL);
    } catch (error) {
      console.error(error.message);
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
      $line.remove();
      this.props.cache.lines = [];
    } catch (error) {
      console.error(error.message);
    }
  }
}
