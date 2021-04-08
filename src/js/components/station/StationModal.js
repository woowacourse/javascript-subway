import {
  showModal,
  closeModal,
  bindModalCloseEvent,
} from '../../utils/modal.js';
import { $ } from '../../utils/dom.js';
import { checkStationValid } from './stationValidator.js';
import { SUCCESS_MESSAGE } from '../../constants.js';
import { showSnackbar } from '../../utils/snackbar.js';
import { stationAPI } from '../../../../api/station.js';

class StationModal {
  #props;
  #stationInfo;
  #userAccessToken;

  constructor(props) {
    this.#props = props;
    this.#stationInfo = null;
    this.#userAccessToken = null;
  }

  init(userAccessToken) {
    this.#userAccessToken = userAccessToken;
    this.initDOM();
  }

  initDOM() {
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
    showModal();
    this.#stationInfo = stationInfo;
    $('#station-modify-input').value = this.#stationInfo.name;
    $('#station-modify-input').select();
  }

  async _handleModifyStationClose(e) {
    e.preventDefault();

    const name = $('#station-modify-input').value;
    if (name === this.#stationInfo.name) {
      closeModal();
      return;
    }

    const message = checkStationValid(name);
    if (message) {
      alert(message);
      return;
    }

    try {
      await stationAPI.modifyStation({
        userAccessToken: this.#userAccessToken,
        id: this.#stationInfo.id,
        name,
      });

      this.#props.modifyStation(this.#stationInfo, name);
      closeModal();
      showSnackbar(SUCCESS_MESSAGE.MODIFY_STATION);
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }
}
export default StationModal;
