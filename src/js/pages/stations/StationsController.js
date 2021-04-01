import { $, resetInput } from '../../utils/DOM.js';
import user from '../../models/user.js';
import StationsView from './StationsView.js';
import {
  addStationHandler,
  saveModifyStationHandler,
  deleteStationHandler,
} from './StationHandlers.js';
import showSnackBar from '../../utils/snackbar.js';
import { ALERT_MESSAGE, SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';
import router from '../../router.js';
import jwtToken from '../../jwtToken.js';
import { COOKIE_KEY } from '../../constants/constants.js';

class StationsController {
  constructor() {
    this.stationsView = new StationsView();
  }

  async init() {
    const allStations = await this.getAllStations();

    if (!allStations) {
      jwtToken.deleteToken(COOKIE_KEY.JWT_TOKEN);
      router.navigate(PATH.ROOT);
      return;
    }

    this.stationsView.init(allStations);
    this.bindEvents();

    resetInput($('#stations-form'), $('#station-name'));
  }

  async getAllStations() {
    try {
      const {
        allStations,
        response,
      } = await user.stationManager.getAllStations();

      if (!response.ok) {
        throw response;
      }

      return allStations;
    } catch (response) {
      switch (response.status) {
        case 401:
          alert(ALERT_MESSAGE.ERROR.INVALID_USER);
          break;
        default:
      }
    }
  }

  async onStationAddBtnClick(e) {
    e.preventDefault();

    const newStation = await addStationHandler(e);
    if (newStation) {
      this.stationsView.appendNewStation(newStation);
      showSnackBar(SNACKBAR_MESSAGE.SUCCESS.ADD_STATION);
      resetInput(e.target, $('#station-name'));
    }
  }

  async onStationUpdateBtnClick(e) {
    if (!e.target.classList.contains('btn')) return;

    if (e.target.classList.contains('js-modify-button')) {
      this.stationsView.renderModifyForm(e);
    }

    if (e.target.classList.contains('js-save-modify-button')) {
      e.preventDefault();

      const { stationId } = e.target.closest('li').dataset;
      const newStationName = e.target.closest('form').elements[
        'new-station-name'
      ].value;

      const resFlag = await saveModifyStationHandler(stationId, newStationName);

      if (resFlag) {
        this.stationsView.renderModifyResult(e, stationId, newStationName);
        showSnackBar(SNACKBAR_MESSAGE.SUCCESS.MODIFY_STATION);
      }
    }

    if (e.target.classList.contains('js-delete-button')) {
      const targetStationId = e.target.closest('li').dataset.stationId;
      const resFlag = await deleteStationHandler(targetStationId);

      if (resFlag) {
        this.stationsView.deleteResult(e);
        showSnackBar(SNACKBAR_MESSAGE.SUCCESS.DELETE_STATION);
      }
    }
  }

  bindEvents() {
    $('#stations-form').addEventListener(
      'submit',
      this.onStationAddBtnClick.bind(this)
    );
    $('#station-list').addEventListener(
      'click',
      this.onStationUpdateBtnClick.bind(this)
    );
  }
}

export default StationsController;
