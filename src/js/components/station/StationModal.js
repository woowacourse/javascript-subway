import {
  onModalShow,
  onModalClose,
  bindModalCloseEvent,
} from '../../utils/modal';
import { $ } from '../../utils/dom';
import { checkStationValid } from './stationValidator';
import { SUCCESS_MESSAGE } from '../../constants';
import { showSnackbar } from '../../utils/snackbar';
import { stationAPI } from '../../api/station';

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
    this._initDOM();
  }

  _initDOM() {
    this._bindEvent();
  }

  _bindEvent() {
    bindModalCloseEvent();
    this._bindStationFormEvent();
  }

  _bindStationFormEvent() {
    $('form[name="modify-station"]').addEventListener(
      'submit',
      this._handleModifyStation.bind(this),
    );
  }

  handleOpenModal(stationInfo) {
    onModalShow();

    this.#stationInfo = stationInfo;
    $('#station-modify-input').value = this.#stationInfo.name;
    $('#station-modify-input').select();
  }

  async _handleModifyStation(e) {
    e.preventDefault();

    const name = $('#station-modify-input').value;
    if (name === this.#stationInfo.name) {
      onModalClose();
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
      showSnackbar(SUCCESS_MESSAGE.MODIFY_STATION);
      onModalClose();
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }
}
export default StationModal;
