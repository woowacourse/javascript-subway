import { stateManager } from '../../@shared/models/StateManager';
import { getFromSessionStorage, $ } from '../../@shared/utils';
import { MESSAGE, NAME_LENGTH, ROUTE, SESSION_KEY, STATE_KEY } from '../constants/constants';
import { hideModal, isValidName, showModal, stationManageAPI } from '../utils';
import { mainElements, modalElements, stationInfo, stationList } from '../views';

export class StationManage {
  constructor(props) {
    this.$mainContent = mainElements[ROUTE.STATIONS];
    this.$modalContent = modalElements[ROUTE.STATIONS];
    this.props = props;
    this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    stateManager[STATE_KEY.ROUTE].subscribe(this.renderStationList.bind(this));
  }

  async renderStationList(route) {
    if (route !== ROUTE.STATIONS) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      if (this.props.cache.stations.length === 0) {
        this.props.cache.stations = await stationManageAPI.getStations(accessToken);
      }

      this.$stationList.innerHTML = stationList(this.props.cache.stations);
    } catch (error) {
      console.error(error.message);
    }
  }

  selectDOM() {
    this.$$stationAdd = {
      $form: $('#station-add-form', this.$mainContent),
      $input: $('#station-add-input', this.$mainContent),
      $button: $('#station-add-button', this.$mainContent),
      $failMessage: $('#add-fail-message-box', this.$mainContent),
    };
    this.$stationList = $('#station-list', this.$mainContent);
    this.$$stationModify = {
      $form: $('#station-modify-form', this.$modalContent),
      $input: $('#station-modify-input', this.$modalContent),
      $button: $('#station-modify-button', this.$modalContent),
      $failMessage: $('#modify-fail-message-box', this.$modalContent),
    };
  }

  bindEvent() {
    this.$$stationAdd.$input.addEventListener('input', this.handleAddInput.bind(this));
    this.$$stationAdd.$form.addEventListener('submit', this.handleAddSubmit.bind(this));
    this.$stationList.addEventListener('click', this.handleModifyButton.bind(this));
    this.$$stationModify.$input.addEventListener('input', this.handleModifyInput.bind(this));
    this.$$stationModify.$form.addEventListener('submit', this.handleModifySubmit.bind(this));
    this.$stationList.addEventListener('click', this.handleRemoveButton.bind(this));
  }

  handleAddInput({ target: { value: stationName } }) {
    if (!isValidName(stationName, NAME_LENGTH.STATION_MIN, NAME_LENGTH.STATION_MAX)) {
      this.$$stationAdd.$failMessage.innerText = MESSAGE.STATION_MANAGE.INVALID_NAME;
      this.$$stationAdd.$button.disabled = true;

      return;
    }

    this.$$stationAdd.$failMessage.innerText = '';
    this.$$stationAdd.$button.disabled = false;
  }

  async handleAddSubmit(event) {
    event.preventDefault();
    const requestInfo = {
      name: this.$$stationAdd.$input.value,
    };

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      const station = await stationManageAPI.addStation(accessToken, requestInfo);

      this.$stationList.innerHTML += stationInfo(station);
      this.$$stationAdd.$form.reset();
      this.props.cache.stations = [];
    } catch (error) {
      console.error(error.message);
      this.$$stationAdd.$failMessage.innerText =
        error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  handleModifyButton({ target }) {
    if (!target.classList.contains('js-modify-button')) return;

    const $station = target.closest('.js-station-list-item');
    const stationId = $station.dataset.stationId;
    const stationName = $('.js-station-name', $station).innerText;

    this.$$stationModify.$input.value = stationName;
    this.$$stationModify.$input.dataset.stationId = stationId;
    showModal(this.props.$modal);
  }

  async handleModifySubmit(event) {
    event.preventDefault();
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    const requestInfo = {
      id: this.$$stationModify.$input.dataset.stationId,
      name: this.$$stationModify.$input.value,
    };

    try {
      await stationManageAPI.modifyStation(accessToken, requestInfo);

      this.$$stationModify.$form.reset();
      this.renderStationList(ROUTE.STATIONS);
      hideModal(this.props.$modal);
      this.props.cache.stations = [];
    } catch (error) {
      console.error(error.message);
      this.$$stationModify.$failMessage.innerText =
        error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  handleModifyInput({ target: { value: stationName } }) {
    if (!isValidName(stationName, NAME_LENGTH.STATION_MIN, NAME_LENGTH.STATION_MAX)) {
      this.$$stationModify.$failMessage.innerText = MESSAGE.STATION_MANAGE.INVALID_NAME;
      this.$$stationModify.$button.disabled = true;

      return;
    }

    this.$$stationModify.$failMessage.innerText = '';
    this.$$stationModify.$button.disabled = false;
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
      $station.remove();
      this.props.cache.stations = [];
    } catch (error) {
      console.error(error.message);
      alert(error.message === '400' ? MESSAGE.STATION_MANAGE.ADDED_STATION : MESSAGE.RETRY);
    }
  }
}
