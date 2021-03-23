import { stateManager } from '../../@shared/models/StateManager';
import { getFromSessionStorage, request, $ } from '../../@shared/utils';
import { BASE_URL, MESSAGE, ROUTE, SESSION_KEY, STATE_KEY } from '../constants/constants';
import { isValidName, showModal } from '../utils';
import { mainElements, stationInfo, stationList } from '../views';

export class StationManage {
  constructor(props) {
    this.$target = mainElements[ROUTE.STATIONS];
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
    this.$stationAddForm = $('#station-add-form', this.$target);
    this.$stationNameInput = $('#station-name', this.$target);
    this.$stationAddButton = $('#station-add-button', this.$target);
    this.$failMessage = $('#fail-message-box', this.$target);
    this.$stationList = $('#station-list', this.$target);
  }

  bindEvent() {
    this.$stationAddForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$stationNameInput.addEventListener('input', this.handleStationNameInput.bind(this));
    this.$stationList.addEventListener('click', this.handleRemoveButton.bind(this));
    this.$stationList.addEventListener('click', this.handleModifyButton.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const station = await this.addStation();

      this.$stationList.innerHTML += stationInfo(station);
      this.clearInput();
    } catch (error) {
      console.error(error.message);
      this.$failMessage.innerText = error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  clearInput() {
    this.$stationNameInput.value = '';
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
        name: this.$stationNameInput.value,
      }),
    };

    try {
      const response = await request(url, option);

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  handleStationNameInput({ target: { value: stationName } }) {
    if (!isValidName(stationName)) {
      this.$failMessage.innerText = MESSAGE.STATION_MANAGE.INVALID_NAME;
      this.$stationAddButton.disabled = true;
      return;
    }
    this.$failMessage.innerText = '';
    this.$stationAddButton.disabled = false;
  }

  async handleModifyButton({ target }) {
    if (!target.classList.contains('js-modify-button')) return;
    showModal(this.props.$modal);
  }

  async handleRemoveButton({ target }) {
    if (!target.classList.contains('js-remove-button')) return;
    const $station = target.closest('.station-list-item');
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
      },
    };

    try {
      await request(url, option);
    } catch (error) {
      throw new Error(error);
    }
  }
}
