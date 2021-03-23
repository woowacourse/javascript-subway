import { stateManager } from '../../@shared/models/StateManager';
import { getFromSessionStorage, request, $ } from '../../@shared/utils';
import { BASE_URL, MESSAGE, ROUTE, SESSION_KEY, STATE_KEY } from '../constants/constants';
import { hideModal, isValidName, showModal } from '../utils';
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
      const stations = await this.getStations();

      this.$stationList.innerHTML = stationList(stations);
    } catch (error) {
      console.error(error.message);
    }
  }

  async getStations() {
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

    if (!accessToken) return [];
    const url = `${BASE_URL}/stations`;
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await request(url, option);
      const stations = await response.json();

      return stations;
    } catch (error) {
      throw new Error(error);
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
    this.$$stationModify.$form.addEventListener('submit', this.handleModifySubmit.bind(this));
    this.$$stationModify.$input.addEventListener('input', this.handleModifyInput.bind(this));
    this.$stationList.addEventListener('click', this.handleRemoveButton.bind(this));
  }

  handleAddInput({ target: { value: stationName } }) {
    if (!isValidName(stationName)) {
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
      const station = await this.addStation();

      this.$stationList.innerHTML += stationInfo(station);
      this.clearInput(this.$$stationAdd.$input);
    } catch (error) {
      console.error(error.message);
      this.$$stationAdd.$failMessage.innerText =
        error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  async addStation() {
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    const url = `${BASE_URL}/stations`;
    const option = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.$$stationAdd.$input.value,
      }),
    };

    try {
      const response = await request(url, option);

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  clearInput($input) {
    $input.value = '';
  }

  handleModifyButton({ target }) {
    if (!target.classList.contains('js-modify-button')) return;

    const $station = target.closest('.station-list-item');
    const stationId = $station.dataset.stationId;
    const name = $('span', $station).innerText;

    this.$$stationModify.$input.value = name;
    this.$$stationModify.$input.dataset.stationId = stationId;
    showModal(this.props.$modal);
  }

  async handleModifySubmit(event) {
    event.preventDefault();
    try {
      // const station = await this.modifyStation();

      hideModal(this.props.$modal);
      this.clearInput(this.$$stationModify.$input);
    } catch (error) {
      console.error(error.message);
      this.$$stationModify.$failMessage.innerText =
        error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  // async modifyStation() {
  //   const { stationId } = this.$$stationModify.$input.dataset;
  // }

  handleModifyInput({ target: { value: stationName } }) {
    if (!isValidName(stationName)) {
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
    const stationId = $station.dataset.stationId;

    if (!confirm(MESSAGE.CONFIRM.STATION_REMOVE)) return;

    try {
      await this.removeStation(stationId);
      $station.remove();
    } catch (error) {
      console.error(error.message);
    }
  }

  async removeStation(stationId) {
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    const url = `${BASE_URL}/stations/${stationId}`;
    const option = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      await request(url, option);
    } catch (error) {
      throw new Error(error);
    }
  }
}
