import { $, hide, show } from '../../utils/dom.js';
import { SELECTOR } from '../../constants/constants.js';
import { addStationRequest } from '../../request.js';
import Station from '../../models/Station.js';
import stationTemplate from './template.js';
import popSnackbar from '../../utils/snackbar.js';

export default class StationManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
  }

  render() {
    this.$content.innerHTML = stationTemplate;
    $(SELECTOR.STATION_LIST).innerHTML = this.store.stations
      .map((station) => station.toListItemTemplate())
      .join('');
  }

  selectDOM() {
    this.stationNameForm = $(SELECTOR.STATION_NAME_FORM);
    this.stationNameInput = $(SELECTOR.STATION_NAME_INPUT);
  }

  bindEvents() {
    this.stationNameInput.addEventListener('input', () => {
      this.setInputValidity();
      hide($(SELECTOR.STATION_DUPLICATED_WARNING));
    });

    this.stationNameForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      this.stationNameInput.reportValidity();
      await this.addStation(e);
    });
  }

  setInputValidity() {
    const validityState = this.stationNameInput.validity;

    if (validityState.valueMissing) {
      this.stationNameInput.setCustomValidity('역 이름을 입력해 주세요.🙀');
    } else if (validityState.tooShort) {
      this.stationNameInput.setCustomValidity('2글자 이상 입력해 주세요.👾');
    } else if (validityState.patternMismatch) {
      this.stationNameInput.setCustomValidity(
        '공백, 특수문자를 제외한 한글을 입력해 주세요.🤓'
      );
    } else {
      this.stationNameInput.setCustomValidity('');
    }
  }

  async addStation(event) {
    try {
      const accessToken = this.store.userAuth.accessToken;
      const name = event.target.elements.stationName.value;
      const stations = this.store.stations;

      if (stations.find((station) => station.name === name)) {
        show($(SELECTOR.STATION_DUPLICATED_WARNING));
        return;
      }

      const response = await addStationRequest({ name }, accessToken);
      const station = new Station(response);

      stations.unshift(station);
      this.store.stations = stations;

      $(SELECTOR.STATION_LIST).insertAdjacentHTML(
        'afterbegin',
        station.toListItemTemplate()
      );

      this.stationNameInput.value = '';
    } catch (error) {
      console.error(error);
      popSnackbar('해당 역을 등록할 수 없습니다.');
    }
  }
}
