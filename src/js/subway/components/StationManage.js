import { stateManager } from '../../@shared/models/StateManager';
import { getFromSessionStorage, $, clearInput } from '../../@shared/utils';
import { MESSAGE, MODAL_TYPE, NAME_LENGTH, ROUTE, SESSION_KEY, STATE_KEY } from '../constants/constants';
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
    stateManager[STATE_KEY.SIGNED_USER].subscribe(this.renderStationList.bind(this));
  }

  async renderStationList() {
    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      const stations = await stationManageAPI.getStations(accessToken);

      this.$stationList.innerHTML = stationList(stations);
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
    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      const station = await stationManageAPI.addStation(accessToken, this.$$stationAdd.$input);

      this.$stationList.innerHTML += stationInfo(station);
      clearInput(this.$$stationAdd.$input);
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
    // TODO: requestLineInfo 이름 변경.
    const stationInfo = {
      id: this.$$stationModify.$input.dataset.stationId,
      name: this.$$stationModify.$input.value,
    };
    const $stationName = $(`[data-station-id="${stationInfo.id}"] > .js-station-name`, this.$stationList);

    try {
      await stationManageAPI.modifyStation(accessToken, stationInfo);

      clearInput(this.$$stationModify.$input);
      $stationName.innerText = stationInfo.name;
      hideModal(this.props.$modal);
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
    // TODO: 노선에 있는 역은 삭제할 수 없다.
    if (!target.classList.contains('js-remove-button')) return;
    const $station = target.closest('.js-station-list-item');
    const stationInfo = {
      id: $station.dataset.stationId,
    };

    if (!confirm(MESSAGE.CONFIRM.STATION_REMOVE)) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      await stationManageAPI.removeStation(accessToken, stationInfo);
      $station.remove();
    } catch (error) {
      console.error(error.message);
    }
  }
}
