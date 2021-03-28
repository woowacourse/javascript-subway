import {
  onModalShow,
  onModalClose,
  bindModalCloseEvent,
} from '../../utils/modal.js';
import { $ } from '../../utils/dom.js';
import { checkStationValid } from './stationValidator.js';
import { REQUEST_METHOD, ACTIONS, BASE_URL } from '../../constants.js';
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

    const { $stationItem, id, name } = this.stationInfo;
    if ($('#station-modify-input').value === name) {
      onModalClose();
      return;
    }

    const message = checkStationValid(name);
    if (message) {
      alert(message);
      return;
    }

    // proccess 처리
    try {
      const option = {
        method: REQUEST_METHOD.PUT,
        Authorization: `Bearer ${this.#userAccessToken}`,
        body: {
          name,
        },
      };

      const newStation = await request(
        `${BASE_URL}${ACTIONS.STATIONS}/${id}`,
        option,
      ).then(res => {
        return res.json();
      });

      // view 처리

      onModalClose();
      // 성공 snackbar
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }
}
export default StationModal;
