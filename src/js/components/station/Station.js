import {
  ACTIONS,
  BASE_URL,
  PAGE_TITLE,
  STORAGE,
  SELECTOR,
  STATION_ERROR,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  FORM,
  CONFIRM_MESSAGE,
  REQUEST_METHOD,
} from '../../constants.js';
import { request } from '../../utils/api.js';
import { $, clearForm } from '../../utils/dom.js';
import { showSnackbar } from '../../utils/snackbar.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import { stationsTemplate, stationTemplate } from './stationTemplate.js';
import { checkStationValid } from './stationValidator.js';

class Station {
  #userAccessToken;
  #stations;
  #props;

  constructor() {
    this.#userAccessToken = null;
    this.#stations = null;
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
      },
    };
  }

  initDOM() {
    // TODO
    // 2. 역 수정/삭제 관련 이벤트 등록(위임) <ul>
    // => 역 추가, 역 수정, 역 삭제
    this.$addStationForm = $(SELECTOR.ADD_STATION_FORM);
    this.$stationList = $(SELECTOR.STATION_LIST);
    this._bindEvent();
  }

  async _initStations() {
    try {
      const option = {
        Authorization: `Bearer ${this.#userAccessToken}`,
      };
      this.#stations = await request(
        `${BASE_URL}${ACTIONS.STATIONS}`,
        option,
      ).then(res => {
        return res.json();
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
        this._handleModifyStation(e);
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

    const name = e.target.elements[FORM.STATION.ADD_INPUT].value;
    const message = checkStationValid(name);
    if (message) {
      alert(message);
      return;
    }

    try {
      // TODO: option, newStation fetch 과정 분리할수 있으면 분리하기
      const option = {
        method: REQUEST_METHOD.POST,
        Authorization: `Bearer ${this.#userAccessToken}`,
        body: {
          name,
        },
      };

      const newStation = await request(
        `${BASE_URL}${ACTIONS.STATIONS}`,
        option,
      ).then(res => {
        return res.json();
      });

      this.$stationList.insertAdjacentHTML(
        'beforeend',
        stationTemplate(newStation),
      );

      clearForm(this.$addStationForm);
      showSnackbar(SUCCESS_MESSAGE.ADD_STATION);
    } catch ({ status }) {
      showSnackbar(STATION_ERROR[status] || ERROR_MESSAGE.ADD_STATION_FAILED);
    }
  }

  async _handleModifyStation(e) {}

  async _handleRemoveStation(e) {
    if (!confirm(CONFIRM_MESSAGE.REMOVE)) return;

    try {
      const option = {
        method: REQUEST_METHOD.DELETE,
        Authorization: `Bearer ${this.#userAccessToken}`,
      };

      const stationItem = e.target.closest('[data-station-id]');
      await request(
        `${BASE_URL}${ACTIONS.STATIONS}/${stationItem.dataset.stationId}`,
        option,
      );

      stationItem.remove();
      showSnackbar(SUCCESS_MESSAGE.REMOVE_STATION);
    } catch (error) {
      console.log(error);
      showSnackbar(ERROR_MESSAGE.REMOVE_STATION_FAILED);
    }
  }
}

export default Station;
