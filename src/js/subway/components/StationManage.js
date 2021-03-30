import { store } from '../../subway/models/store';
import { getFromSessionStorage, $ } from '../../@shared/utils';
import { DOM, MESSAGE, NAME_LENGTH, SESSION_KEY, STATE_KEY } from '../constants';
import { hideModal, isValidName, showModal, stationManageAPI } from '../utils';
import { subwayView } from '../views';
import { Component } from '../../@shared/models/Component';

export class StationManage extends Component {
  setup() {
    store[STATE_KEY.STATIONS].subscribe(this.updateStations.bind(this));
  }

  async updateStations(stations) {
    subwayView.renderStationList(stations);
  }

  bindEvent() {
    DOM.STATION.MAIN.FORM.addEventListener('input', this.handleAddInput.bind(this));
    DOM.STATION.MAIN.FORM.addEventListener('submit', this.handleAddSubmit.bind(this));
    DOM.STATION.MAIN.LIST.addEventListener('click', this.handleModifyButton.bind(this));
    DOM.STATION.MODAL.NAME_INPUT.addEventListener('input', this.handleModifyInput.bind(this));
    DOM.STATION.MODAL.FORM.addEventListener('submit', this.handleModifySubmit.bind(this));
    DOM.STATION.MAIN.LIST.addEventListener('click', this.handleRemoveButton.bind(this));
  }

  handleAddInput({ target: { value: stationName } }) {
    if (!isValidName(stationName, NAME_LENGTH.STATION_MIN, NAME_LENGTH.STATION_MAX)) {
      DOM.STATION.MAIN.NAME_MSG.innerText = MESSAGE.STATION_MANAGE.INVALID_NAME;
      DOM.STATION.MAIN.SUBMIT_BUTTON.disabled = true;

      return;
    }

    DOM.STATION.MAIN.NAME_MSG.innerText = '';
    DOM.STATION.MAIN.SUBMIT_BUTTON.disabled = false;
  }

  async handleAddSubmit(event) {
    event.preventDefault();
    const requestInfo = {
      name: DOM.STATION.MAIN.NAME_INPUT.value,
    };

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      await stationManageAPI.addStation(accessToken, requestInfo);
      store[STATE_KEY.STATIONS].update();
      DOM.STATION.MAIN.FORM.reset();
    } catch (error) {
      DOM.STATION.MAIN.NAME_MSG.innerText =
        error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  handleModifyButton({ target }) {
    if (!target.classList.contains('js-modify-button')) return;

    const $station = target.closest('.js-station-list-item');
    const stationId = $station.dataset.stationId;
    const stationName = $('.js-station-name', $station).innerText;

    DOM.STATION.MODAL.NAME_INPUT.value = stationName;
    DOM.STATION.MODAL.NAME_INPUT.dataset.stationId = stationId;
    showModal(DOM.CONTAINER.MODAL);
  }

  async handleModifySubmit(event) {
    event.preventDefault();
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    const requestInfo = {
      id: DOM.STATION.MODAL.NAME_INPUT.dataset.stationId,
      name: DOM.STATION.MODAL.NAME_INPUT.value,
    };

    try {
      await stationManageAPI.modifyStation(accessToken, requestInfo);
      store[STATE_KEY.STATIONS].update();
      DOM.STATION.MODAL.FORM.reset();
      hideModal(DOM.CONTAINER.MODAL);
    } catch (error) {
      DOM.STATION.MODAL.NAME_MSG.innerText =
        error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  handleModifyInput({ target: { value: stationName } }) {
    if (!isValidName(stationName, NAME_LENGTH.STATION_MIN, NAME_LENGTH.STATION_MAX)) {
      DOM.STATION.MODAL.NAME_MSG.innerText = MESSAGE.STATION_MANAGE.INVALID_NAME;
      DOM.STATION.MODAL.SUBMIT_BUTTON.disabled = true;

      return;
    }

    DOM.STATION.MODAL.NAME_MSG.innerText = '';
    DOM.STATION.MODAL.SUBMIT_BUTTON.disabled = false;
  }

  async handleRemoveButton({ target }) {
    if (!target.classList.contains('js-remove-button')) return;
    const $station = target.closest('.js-station-list-item');
    const requestInfo = {
      id: $station.dataset.stationId,
    };

    if (!confirm(MESSAGE.CONFIRM.STATION_REMOVE)) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      await stationManageAPI.removeStation(accessToken, requestInfo);
      store[STATE_KEY.STATIONS].update();
    } catch (error) {
      alert(error.message === '400' ? MESSAGE.STATION_MANAGE.ADDED_STATION : MESSAGE.RETRY);
    }
  }
}
