import Cookies from 'js-cookie';

import user from '../../models/user.js';
import StationsView from './StationsView.js';
import {
  addStationHandler,
  saveModifyStationHandler,
  deleteStationHandler,
} from './StationHandlers.js';

import router from '../../router.js';

import { $, resetInput } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';

import { SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';
import { COOKIE_KEY } from '../../constants/constants.js';

class StationsController {
  constructor() {
    this.stationsView = new StationsView();
  }

  async init() {
    const allStations = await this.getAllStations();

    if (!allStations) return;

    this.stationsView.init(allStations);
    this.bindEvents();

    resetInput($('#stations-form'));
  }

  async getAllStations() {
    const {
      allStations,
      response,
    } = await user.stationManager.getAllStations();

    switch (response.status) {
      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        return allStations;
    }
  }

  bindEvents() {
    $('#stations-form').addEventListener(
      'submit',
      this.onClickStationAddBtn.bind(this)
    );
    $('#station-list').addEventListener(
      'click',
      this.onClickStationUpdateBtn.bind(this)
    );
  }

  async onClickStationAddBtn(e) {
    e.preventDefault();

    const newStation = await addStationHandler(e.target);

    if (newStation) {
      this.stationsView.appendNewStation(newStation);
      resetInput(e.target);

      showSnackBar(SNACKBAR_MESSAGE.SUCCESS.ADD_STATION);
    }
  }

  async onClickStationUpdateBtn(e) {
    if (!e.target.classList.contains('btn')) return;

    await this.modifyStation(e);
    await this.deleteStation(e);
  }

  async modifyStation(e) {
    if (e.target.classList.contains('js-modify-button')) {
      this.stationsView.renderModifyForm(e.target);
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
  }

  async deleteStation({ target }) {
    if (target.classList.contains('js-delete-button')) {
      const targetStationId = target.closest('li').dataset.stationId;

      const resFlag = await deleteStationHandler(targetStationId);
      if (resFlag) {
        this.stationsView.deleteResult(target);

        showSnackBar(SNACKBAR_MESSAGE.SUCCESS.DELETE_STATION);
      }
    }
  }
}

export default StationsController;
