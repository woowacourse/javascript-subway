import Component from '../../core/Component.js';
import { stationsTemplate, stationListTemplate } from './template.js';
import { $, API, showSnackbar } from '../../utils/index.js';
import {
  LOGIN_REQUIRED_TEMPLATE,
  SNACKBAR_MESSAGE,
  STATIONS,
} from '../../constants/index.js';
export default class Stations extends Component {
  #token;
  constructor() {
    super();
    this.#token;
  }

  bindEvent() {
    $('#station-input-form').addEventListener(
      'submit',
      this.handleStationInputForm.bind(this),
    );
  }

  isValidStationNameLength(name) {
    return (
      STATIONS.MIN_STATION_NAME_LENGTH <= name.length &&
      name.length <= STATIONS.MAX_STATION_NAME_LENGTH
    );
  }

  async handleStationInputForm(e) {
    e.preventDefault();

    const $stationNameInput = e.target.elements['station-name-input'];

    if (!this.isValidStationNameLength($stationNameInput.value)) {
      showSnackbar(SNACKBAR_MESSAGE.IS_NOT_VALID_STATION_NAME_LENGTH);
      return;
    }

    try {
      const response = await API.createStation({
        token: this.#token,
        name: $stationNameInput.value,
      });
      const responseJSON = await response.json();
      $('#station-list-container').insertAdjacentHTML(
        'beforeend',
        stationListTemplate(responseJSON),
      );
      $stationNameInput.value = '';
    } catch (err) {
      console.log(err);
    }
  }

  async getStationList(token) {
    try {
      const response = await API.getStationList(token);
      const responseJSON = await response.json();

      return responseJSON;
    } catch (err) {
      throw new Error(err);
    }
  }

  render(token, stationList) {
    $('main').innerHTML = token
      ? stationsTemplate(stationList)
      : LOGIN_REQUIRED_TEMPLATE;
    $('#station-name-input').focus();
  }

  async load(token) {
    try {
      const stationList = await this.getStationList(token);

      this.#token = token;
      this.render(token, stationList);
      this.bindEvent(token);
    } catch (err) {
      console.error(err);
    }
  }
}
