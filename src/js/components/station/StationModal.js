import {
  showModal,
  closeModal,
  bindModalCloseEvent,
} from '../../utils/modal.js';
import { $ } from '../../utils/dom.js';
import { checkStationValid } from './stationValidator.js';
import { SELECTOR, SUCCESS_MESSAGE } from '../../constants.js';
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
    $(SELECTOR.STATION_FORM).addEventListener(
      'submit',
      this._handleModifyStationClose.bind(this),
    );
  }

  handleModifyStationOpen(stationInfo) {
    showModal();
    this.#stationInfo = stationInfo;
    $(SELECTOR.STATION_MODIFY_INPUT).value = this.#stationInfo.name;
    $(SELECTOR.STATION_MODIFY_INPUT).select();
  }

  async _handleModifyStationClose(e) {
    e.preventDefault();

    const name = $(SELECTOR.STATION_MODIFY_INPUT).value;
    if (name === this.#stationInfo.name) {
      closeModal();
      return;
    }

    const message = checkStationValid(name);
    if (message) {
      alert(message);
      return;
    }

    await this._addStation(name);
    closeModal();
  }

  async _addStation(name) {
    try {
      await stationAPI.modifyStation({
        userAccessToken: this.#userAccessToken,
        id: this.#stationInfo.id,
        name,
      });

      this.#props.modifyStation(this.#stationInfo, name);
      showSnackbar(SUCCESS_MESSAGE.MODIFY_STATION);
    } catch (error) {
      showSnackbar(error);
    }
  }
}
export default StationModal;
