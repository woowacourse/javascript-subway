import { $, hide, show } from '../../utils/dom.js';
import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { addStationRequest, deleteStationRequest, stationListRequest } from '../../request.js';
import Station from '../../models/Station.js';
import { contentTemplate } from './template.js';
import StationModal from './StationModal.js';
import popSnackbar from '../../utils/snackbar.js';

export default class StationManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
    this.modal = new StationModal(this.store);
    this.bindModalEvents();
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
    this.modal.init();
  }

  render() {
    this.$content.innerHTML = contentTemplate;
    this.$stationList = $(SELECTOR.STATION_LIST);
    this.$stationList.innerHTML = this.store.stations.map((station) => station.toListItemTemplate()).join('');
  }

  selectDOM() {
    this.$stationNameForm = $(SELECTOR.STATION_NAME_FORM);
    this.$stationNameInput = $(SELECTOR.STATION_NAME_INPUT);
  }

  bindEvents() {
    this.$stationNameInput.addEventListener('input', this.handleNameInput.bind(this));
    this.$stationNameForm.addEventListener('submit', this.handleNameSubmit.bind(this));
    this.$stationList.addEventListener('click', this.handleItemButtons.bind(this));
  }

  bindModalEvents() {
    $(SELECTOR.MODAL).addEventListener('updateName', this.updateName.bind(this));
  }

  handleNameInput() {
    this.setInputValidity();
    hide($(SELECTOR.STATION_DUPLICATED_WARNING));
  }

  setInputValidity() {
    const validityState = this.$stationNameInput.validity;

    if (validityState.valueMissing) {
      this.$stationNameInput.setCustomValidity('역 이름을 입력해 주세요.🙀');
    } else if (validityState.tooShort) {
      this.$stationNameInput.setCustomValidity('2글자 이상 입력해 주세요.👾');
    } else if (validityState.patternMismatch) {
      this.$stationNameInput.setCustomValidity('공백, 특수문자를 제외한 한글을 입력해 주세요.🤓');
    } else {
      this.$stationNameInput.setCustomValidity('');
    }
  }

  async handleNameSubmit(event) {
    event.preventDefault();
    if (!this.$stationNameInput.reportValidity()) return;

    await this.addStation(event);
  }

  async addStation(event) {
    try {
      const accessToken = this.store.userAuth.accessToken;
      const name = event.target.elements.stationName.value;

      if (this.store.stations.find((station) => station.name === name)) {
        show($(SELECTOR.STATION_DUPLICATED_WARNING));
        return;
      }

      const response = await addStationRequest({ name }, accessToken);
      const station = new Station(response);

      this.store.stations = [station, ...this.store.stations];

      $(SELECTOR.STATION_LIST).insertAdjacentHTML('afterbegin', station.toListItemTemplate());
      this.$stationNameInput.value = '';
    } catch (error) {
      console.error(error);
      popSnackbar(MESSAGES.STATION_ADD.FAIL);
    }
  }

  async handleItemButtons(event) {
    if (event.target.type !== 'button') return;

    if (event.target.dataset.action === 'edit') {
      const stationID = event.target.closest('li').dataset.stationId;
      const station = this.store.stations.find((station) => station.id === Number(stationID));
      this.modal.open(station);
    }

    if (event.target.dataset.action === 'delete') {
      await this.deleteStationItem(event);
    }
  }

  async updateName() {
    const accessToken = this.store.userAuth.accessToken;
    const stationListResponse = await stationListRequest(accessToken);
    const stations = stationListResponse.map((station) => new Station(station));

    this.store.stations = stations;
    this.$stationList.innerHTML = this.store.stations.map((station) => station.toListItemTemplate()).join('');
  }

  async deleteStationItem(event) {
    const stationItem = event.target.closest('li');
    const stationName = stationItem.dataset.stationName;
    const stationID = Number(stationItem.dataset.stationId);
    const itemDivider = stationItem.nextElementSibling;
    const accessToken = this.store.userAuth.accessToken;

    if (!window.confirm(MESSAGES.STATION_DELETE.CONFIRM(stationName))) return;

    try {
      await deleteStationRequest(stationID, accessToken);

      stationItem.remove();
      if (itemDivider.matches('hr')) {
        itemDivider.remove();
      }

      this.deleteStationData(stationID);
      popSnackbar(MESSAGES.STATION_DELETE.SUCCESS(stationName));
    } catch (error) {
      console.error(error);
      popSnackbar(error.message || MESSAGES.STATION_DELETE.FAIL);
    }
  }

  deleteStationData(stationID) {
    const stations = this.store.stations;
    const updatedStations = stations.filter((station) => station.id !== stationID);

    this.store.stations = updatedStations;
  }
}
