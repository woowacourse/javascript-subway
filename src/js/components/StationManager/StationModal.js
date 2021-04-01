import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { $, hide, show } from '../../utils/dom.js';
import popSnackbar from '../../utils/snackbar.js';
import { editStationRequest } from '../../request.js';
import { modalTemplate } from './template.js';

export default class StationModal {
  constructor(store) {
    this.store = store;
    this.$root = $(SELECTOR.MODAL);
  }

  init() {
    this.$root.innerHTML = modalTemplate;
    this.selectDOM();
    this.bindEvents();
  }

  selectDOM() {
    this.$modalCloseButton = $(SELECTOR.MODAL_CLOSE);
    this.$stationNameEditForm = $(SELECTOR.STATION_NAME_EDIT_FORM);
    this.$stationNameEditInput = $(SELECTOR.STATION_NAME_EDIT_INPUT);
    this.$stationDuplicatedWarning = $(SELECTOR.STATION_NAME_EDIT_DUPLICATED_WARNING);
  }

  bindEvents() {
    this.$stationNameEditForm.addEventListener('submit', this.editStation.bind(this));
    this.$modalCloseButton.addEventListener('click', this.close.bind(this));
    this.$root.addEventListener('mousedown', this.handleClickOutsideModal.bind(this));
    document.addEventListener('keydown', this.handleESCKey.bind(this));
  }

  open(station) {
    this.$root.classList.add('open');
    this.station = station;
    this.activateInput();
  }

  activateInput() {
    this.$stationNameEditInput.setAttribute('placeholder', this.station.name);
    this.$stationNameEditInput.setAttribute('value', this.station.name);
    this.$stationNameEditInput.focus();
  }

  async editStation(event) {
    event.preventDefault();

    const stationID = this.station.id;
    const newName = event.target.elements['station-name-edit'].value;
    const accessToken = this.store.userAuth.accessToken;

    if (this.station.name === newName) {
      this.close();
      return;
    }

    if (this.checkNameDuplicated(newName)) return;

    try {
      await editStationRequest(stationID, newName, accessToken);
      popSnackbar(MESSAGES.STATION_NAME_EDIT.SUCCESS);

      this.close();
      this.$root.dispatchEvent(
        new CustomEvent('updateName', {
          detail: { station: this.station, newName },
        })
      );
    } catch (error) {
      console.error(error);
      if (error.message === ERROR_CODE.UNAUTHORIZED) {
        this.store.updateLoggedIn(false);
        alert(MESSAGES.ERROR_UNAUTHORIZED);
        return;
      }
      this.handleRequestError(error);
    }
  }

  checkNameDuplicated(name) {
    if (this.store.stations.find((station) => station.name === name)) {
      show(this.$stationDuplicatedWarning);
      this.$stationNameEditInput.select();

      return true;
    }

    hide(this.$stationDuplicatedWarning);
    return false;
  }

  handleRequestError(error) {
    if (error.message === '400') {
      show(this.$stationDuplicatedWarning);
      this.$stationNameEditInput.select();

      return;
    }

    popSnackbar(MESSAGES.STATION_NAME_EDIT.FAIL);
  }

  close() {
    this.$root.classList.remove('open');
  }

  handleESCKey(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  handleClickOutsideModal(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
