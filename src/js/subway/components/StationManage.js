import { store } from '../../@shared/models/store';
import { getFromSessionStorage, $ } from '../../@shared/utils';
import { MESSAGE, NAME_LENGTH, ROUTE, SESSION_KEY, STATE_KEY } from '../constants/constants';
import { DOM } from '../constants/dom';
import { hideModal, isValidName, showModal, stationManageAPI } from '../utils';
import { subwayView } from '../views';

export class StationManage {
  #props = null;

  constructor(props) {
    this.#props = props;
    this.#setup();
    this.#bindEvent();
  }

  #setup() {
    store[STATE_KEY.ROUTE].subscribe(this.#updateStations.bind(this));
  }

  async #updateStations(route) {
    if (route !== ROUTE.STATIONS) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      if (this.#props.cache.stations.length === 0) {
        this.#props.cache.stations = await stationManageAPI.getStations(accessToken);
      }

      subwayView.renderStationList(this.#props.cache.stations);
    } catch (error) {
      console.error(error.message);
    }
  }

  #bindEvent() {
    DOM.STATION.MAIN.FORM.addEventListener('input', this.#handleAddInput.bind(this));
    DOM.STATION.MAIN.FORM.addEventListener('submit', this.#handleAddSubmit.bind(this));
    DOM.STATION.MAIN.LIST.addEventListener('click', this.#handleModifyButton.bind(this));
    DOM.STATION.MODAL.NAME_INPUT.addEventListener('input', this.#handleModifyInput.bind(this));
    DOM.STATION.MODAL.FORM.addEventListener('submit', this.#handleModifySubmit.bind(this));
    DOM.STATION.MAIN.LIST.addEventListener('click', this.#handleRemoveButton.bind(this));
  }

  #handleAddInput({ target: { value: stationName } }) {
    if (!isValidName(stationName, NAME_LENGTH.STATION_MIN, NAME_LENGTH.STATION_MAX)) {
      DOM.STATION.MAIN.NAME_MSG.innerText = MESSAGE.STATION_MANAGE.INVALID_NAME;
      DOM.STATION.MAIN.SUBMIT_BUTTON.disabled = true;

      return;
    }

    DOM.STATION.MAIN.NAME_MSG.innerText = '';
    DOM.STATION.MAIN.SUBMIT_BUTTON.disabled = false;
  }

  async #handleAddSubmit(event) {
    event.preventDefault();
    const requestInfo = {
      name: DOM.STATION.MAIN.NAME_INPUT.value,
    };

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      await stationManageAPI.addStation(accessToken, requestInfo);
      this.#props.cache.stations = [];
      await this.#updateStations(ROUTE.STATIONS);
      DOM.STATION.MAIN.FORM.reset();
    } catch (error) {
      DOM.STATION.MAIN.NAME_MSG.innerText =
        error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  #handleModifyButton({ target }) {
    if (!target.classList.contains('js-modify-button')) return;

    const $station = target.closest('.js-station-list-item');
    const stationId = $station.dataset.stationId;
    const stationName = $('.js-station-name', $station).innerText;

    DOM.STATION.MODAL.NAME_INPUT.value = stationName;
    DOM.STATION.MODAL.NAME_INPUT.dataset.stationId = stationId;
    showModal(DOM.CONTAINER.MODAL);
  }

  async #handleModifySubmit(event) {
    event.preventDefault();
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    const requestInfo = {
      id: DOM.STATION.MODAL.NAME_INPUT.dataset.stationId,
      name: DOM.STATION.MODAL.NAME_INPUT.value,
    };

    try {
      await stationManageAPI.modifyStation(accessToken, requestInfo);

      DOM.STATION.MODAL.FORM.reset();
      this.#props.cache.stations = [];
      this.#props.cache.lines = [];
      await this.#updateStations(ROUTE.STATIONS);
      hideModal(DOM.CONTAINER.MODAL);
    } catch (error) {
      DOM.STATION.MODAL.NAME_MSG.innerText =
        error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  #handleModifyInput({ target: { value: stationName } }) {
    if (!isValidName(stationName, NAME_LENGTH.STATION_MIN, NAME_LENGTH.STATION_MAX)) {
      DOM.STATION.MODAL.NAME_MSG.innerText = MESSAGE.STATION_MANAGE.INVALID_NAME;
      DOM.STATION.MODAL.SUBMIT_BUTTON.disabled = true;

      return;
    }

    DOM.STATION.MODAL.NAME_MSG.innerText = '';
    DOM.STATION.MODAL.SUBMIT_BUTTON.disabled = false;
  }

  async #handleRemoveButton({ target }) {
    if (!target.classList.contains('js-remove-button')) return;
    const $station = target.closest('.js-station-list-item');
    const requestInfo = {
      id: $station.dataset.stationId,
    };

    if (!confirm(MESSAGE.CONFIRM.STATION_REMOVE)) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      await stationManageAPI.removeStation(accessToken, requestInfo);
      $station.remove();
      this.#props.cache.stations = [];
    } catch (error) {
      alert(error.message === '400' ? MESSAGE.STATION_MANAGE.ADDED_STATION : MESSAGE.RETRY);
    }
  }
}
