import { stationAPI } from '../../../../api/station.js';
import {
  PAGE_TITLE,
  STORAGE,
  SELECTOR,
  STATION_ERROR,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  FORM,
  CONFIRM_MESSAGE,
} from '../../constants.js';
import { $, clearForm } from '../../utils/dom.js';

import { showSnackbar } from '../../utils/snackbar.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import StationModal from './StationModal.js';
import {
  modalTemplate,
  stationsTemplate,
  stationTemplate,
} from './stationTemplate.js';
import { checkStationValid } from './stationValidator.js';

class Station {
  #userAccessToken;
  #stations;
  #modal;

  constructor() {
    this.#userAccessToken = null;
    this.#stations = {};
    this.#modal = new StationModal({
      updateStations: this.updateStations.bind(this),
    });
  }

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    await this._initStations();
  }

  getPageInfo() {
    return {
      title: PAGE_TITLE.STATIONS,
      contents: {
        main: stationsTemplate(this.#stations),
        modal: modalTemplate(),
      },
    };
  }

  initDOM() {
    this.$addStationForm = $(SELECTOR.ADD_STATION_FORM);
    this.$stationList = $(SELECTOR.STATION_LIST);
    this.#modal.init(this.#userAccessToken);
    this._bindEvent();
  }

  async _initStations() {
    try {
      this.#stations = {};

      const stations = await stationAPI.getStations(this.#userAccessToken);
      stations.forEach(({ id, ...rest }) => {
        this.#stations[id] = rest;
      });
    } catch {
      alert(ERROR_MESSAGE.LOAD_STATION_FAILED);
    }
  }

  _bindEvent() {
    this._bindAddStationEvent();
    this._bindUpdateStationEvent();
  }

  _bindAddStationEvent() {
    this.$addStationForm.addEventListener('submit', e => {
      this._handleAddStation(e);
    });
  }

  _bindUpdateStationEvent() {
    this.$stationList.addEventListener('click', e => {
      if (e.target.classList.contains('modify-button')) {
        this.#modal.handleModifyStationOpen(this._getSelectedStationInfo(e));
        return;
      }

      if (e.target.classList.contains('delete-button')) {
        this._handleRemoveStation(e);
        return;
      }
    });
  }

  async _handleAddStation(e) {
    e.preventDefault();

    const stationName = e.target.elements[FORM.STATION.ADD_INPUT].value;
    const message = checkStationValid(stationName);
    if (message) {
      alert(message);
      return;
    }

    try {
      const { id, ...rest } = await stationAPI.addStations({
        userAccessToken: this.#userAccessToken,
        name: stationName,
      });

      this.#stations[id] = rest;
      this.$stationList.insertAdjacentHTML(
        'beforeend',
        stationTemplate(id, { name: this.#stations[id].name }),
      );

      clearForm(this.$addStationForm);
      showSnackbar(SUCCESS_MESSAGE.ADD_STATION);
    } catch ({ status }) {
      showSnackbar(STATION_ERROR[status] || ERROR_MESSAGE.ADD_STATION_FAILED);
    }
  }

  async _handleRemoveStation(e) {
    if (!confirm(CONFIRM_MESSAGE.REMOVE)) return;

    try {
      const { $stationItem, id } = this._getSelectedStationInfo(e);

      await stationAPI.deleteStations({
        userAccessToken: this.#userAccessToken,
        id,
      });

      delete this.#stations[id];
      $stationItem.remove();
      showSnackbar(SUCCESS_MESSAGE.REMOVE_STATION);
    } catch (error) {
      showSnackbar(ERROR_MESSAGE.REMOVE_STATION_FAILED);
    }
  }

  _getSelectedStationInfo({ target }) {
    const $stationItem = target.closest('[data-station-id]');
    const id = $stationItem.dataset.stationId;
    const name = this.#stations[id].name;

    return { $stationItem, id, name };
  }

  updateStations(id, name) {
    this.#stations[id].name = name;
  }
}

export default Station;
