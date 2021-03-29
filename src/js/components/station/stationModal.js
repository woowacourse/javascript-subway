import {
  onModalShow,
  onModalClose,
  bindModalCloseEvent,
} from '../../utils/modal.js';
import { $ } from '../../utils/dom.js';
import { checkStationValid } from './stationValidator.js';
import { SELECTOR, SUCCESS_MESSAGE } from '../../constants.js';
import { showSnackbar } from '../../utils/snackbar.js';
import { stationAPI } from '../../../../api/station.js';

class StationModal {
  #userAccessToken;

  constructor({ updateStations }) {
    this.stationInfo = null;
    this.#userAccessToken = null;
    this.updateStations = updateStations;
  }

  init(userAccessToken) {
    this.#userAccessToken = userAccessToken;
    this.initDOM();
  }

  initDOM() {
    this.bindEvent();
  }

  bindEvent() {
    bindModalCloseEvent();
    this.bindStationFormEvent();
  }
  bindStationFormEvent() {
    $('form[name="modify-station"]').addEventListener(
      'submit',
      this._handleModifyStationClose.bind(this),
    );
  }

  handleModifyStationOpen(stationInfo) {
    onModalShow();
    this.stationInfo = stationInfo;
    $('#station-modify-input').value = this.stationInfo.name;
    $('#station-modify-input').focus();
  }

  async _handleModifyStationClose(e) {
    e.preventDefault();

    const newName = $('#station-modify-input').value;
    const { $stationItem, id, name } = this.stationInfo;
    if (newName === name) {
      onModalClose();
      return;
    }

    const message = checkStationValid(newName);
    if (message) {
      alert(message);
      return;
    }

    try {
      await stationAPI.modifyStation({
        userAccessToken: this.#userAccessToken,
        id,
        name: newName,
      });
      $(SELECTOR.STATION_ITEM_NAME, $stationItem).innerHTML = newName;

      this.updateStations(id, newName);
      onModalClose();
      showSnackbar(SUCCESS_MESSAGE.MODIFY_STATION);
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }
}
export default StationModal;
