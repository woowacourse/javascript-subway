import StationModal from './StationModal';
import { checkStationValid } from './stationValidator';
import {
  modalTemplate,
  stationsTemplate,
  stationTemplate,
} from './stationTemplate';

import { initStations } from '../../models/model';

import { $, clearForm } from '../../utils/dom';
import { showSnackbar } from '../../utils/snackbar';
import { getLocalStorageItem } from '../../utils/storage';
import { stationAPI } from '../../api/station';
import {
  PAGE_TITLE,
  STORAGE,
  SELECTOR,
  STATION_ERROR,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  FORM,
  CONFIRM_MESSAGE,
  CLASS_NAME,
} from '../../constants';

class Station {
  #userAccessToken;
  #stations;
  #modal;

  constructor() {
    this.#userAccessToken = null;
    this.#stations = {};
    this.#modal = new StationModal({
      modifyStation: this.modifyStation.bind(this),
    });
  }

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    this.#stations = await initStations(this.#userAccessToken);
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
      if (e.target.classList.contains(CLASS_NAME.MODIFY_BUTTON)) {
        const stationInfo = this._getSelectedStationInfo(e);
        this.#modal.handleOpenModal(stationInfo);
        return;
      }

      if (e.target.classList.contains(CLASS_NAME.DELETE_BUTTON)) {
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
      const newStation = await stationAPI.addStations({
        userAccessToken: this.#userAccessToken,
        name: stationName,
      });

      this._addStation(newStation);
      clearForm(this.$addStationForm);
      showSnackbar(SUCCESS_MESSAGE.ADD_STATION);
    } catch ({ status }) {
      showSnackbar(
        STATION_ERROR.ADD[status] || ERROR_MESSAGE.ADD_STATION_FAILED,
      );
    }
  }

  async _handleRemoveStation(e) {
    if (!confirm(CONFIRM_MESSAGE.REMOVE)) return;

    try {
      const stationInfo = this._getSelectedStationInfo(e);

      await stationAPI.deleteStations({
        userAccessToken: this.#userAccessToken,
        id: stationInfo.id,
      });

      this._removeStation(stationInfo);
      showSnackbar(SUCCESS_MESSAGE.REMOVE_STATION);
    } catch ({ status }) {
      showSnackbar(
        STATION_ERROR.DELETE[status] || ERROR_MESSAGE.REMOVE_STATION_FAILED,
      );
    }
  }

  _getSelectedStationInfo({ target }) {
    const $stationItem = target.closest('[data-station-id]');
    const id = $stationItem.dataset.stationId;
    const name = this.#stations[id].name;

    return { $stationItem, id, name };
  }

  _addStation({ id, ...station }) {
    this.#stations[id] = station;
    this.$stationList.insertAdjacentHTML(
      'beforeend',
      stationTemplate(id, { name: this.#stations[id].name }),
    );
  }

  modifyStation({ id, $stationItem }, newName) {
    this.#stations[id].name = newName;
    $(SELECTOR.STATION_ITEM_NAME, $stationItem).textContent = newName;
  }

  _removeStation({ id, $stationItem }) {
    delete this.#stations[id];
    $stationItem.remove();
  }
}

export default Station;
