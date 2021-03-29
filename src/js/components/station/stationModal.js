import {
  onModalShow,
  onModalClose,
  bindModalCloseEvent,
} from '../../utils/modal.js';
import { $ } from '../../utils/dom.js';
import { checkStationValid } from './stationValidator.js';
import {
  REQUEST_METHOD,
  ACTIONS,
  BASE_URL,
  SELECTOR,
  SUCCESS_MESSAGE,
} from '../../constants.js';
import { request } from '../../utils/api.js';
import { showSnackbar } from '../../utils/snackbar.js';

class StationModal {
  #userAccessToken;

  constructor() {
    this.stationInfo = null;
    this.#userAccessToken = null;
  }

  init(userAccessToken) {
    this.#userAccessToken = userAccessToken;
    this.initDOM();
  }

  initDOM() {
    bindModalCloseEvent();

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
      const option = {
        method: REQUEST_METHOD.PUT,
        Authorization: `Bearer ${this.#userAccessToken}`,
        body: {
          name: newName,
        },
      };

      await request(`${BASE_URL}${ACTIONS.STATIONS}/${id}`, option);

      $(SELECTOR.STATION_ITEM_NAME, $stationItem).innerHTML = newName;
      onModalClose();
      showSnackbar(SUCCESS_MESSAGE.MODIFY_STATION);
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }
}
export default StationModal;
