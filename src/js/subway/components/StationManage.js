import { stateManager } from '../../@shared/models/StateManager';
import { getFromSessionStorage, request, $ } from '../../@shared/utils';
import { BASE_URL, MESSAGE, ROUTE, SESSION_KEY, STATE_KEY } from '../constants/constants';
import { isValidName } from '../utils';
import { contentElements, stationInfo, stationList } from '../views';

export class StationManage {
  constructor() {
    this.$target = contentElements[ROUTE.STATIONS];
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
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const station = await this.addStation();

      this.$stationList.innerHTML += stationInfo(station);
    } catch (error) {
      console.error(error.message);
      this.$failMessage.innerText = error.message === '400' ? MESSAGE.STATION_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
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

  async handleRemoveButton({ target }) {
    if (!target.classList.contains('js-remove-button')) return;
    const $station = target.closest('.station-list-item');
    const stationId = $station.dataset.stationId;

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
    console.log(url);
    const option = {
      method: 'DELETE',
      headers: {
        // 무야호
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
