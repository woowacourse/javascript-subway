import { $ } from '../utils/dom';
import { openModal, closeModal } from '../utils/modal';
import {
  requestAddStation,
  requestEditStationName,
  requestRemoveStation,
  requestGetStationList,
} from '../requestData/requestUserData';
import { validateName } from '../validators/validation';
import { getStationListTemplate } from '../templates/stations';
import UserDataManager from '../model/UserDataManager';
import { REMOVE_CONFIRM_MESSAGE, ELEMENT } from '../utils/constants';

class Stations {
  constructor(props) {
    this.props = props;
    this.stationListTemplate = '';
    this.stationNameInEdit = '';
    this.userDataManager = new UserDataManager();
  }

  async init() {
    this.selectDom();
    this.bindEvent();
    !this.stationListTemplate && (await this.setStationListTemplate());
    this.renderStationList();
  }

  selectDom() {
    this.$stationForm = $(`.${ELEMENT.STATION_FORM}`);
    this.$stationListWrapper = $(`.${ELEMENT.STATION_LIST_WRAPPER}`);
    this.$modal = $(`.${ELEMENT.MODAL}`);
    this.$modalStationNameEditInput = $(`.${ELEMENT.MODAL_STATION_NAME_EDIT_INPUT}`);
    this.$modalStationNameEditForm = $(`.${ELEMENT.MODAL_STATION_NAME_EDIT_FORM}`);
  }

  bindEvent() {
    this.$stationForm.addEventListener('submit', this.handleStationForm.bind(this));
    this.$stationListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains(ELEMENT.STATION_LIST_ITEM_EDIT_BUTTON)) {
        this.handleStationNameEditButton(e);

        return;
      }
      if (e.target.classList.contains(ELEMENT.STATION_LIST_ITEM_REMOVE_BUTTON)) {
        this.handleStationNameRemoveButton(e);
      }
    });
    this.$modalStationNameEditForm.addEventListener('submit', this.handleStationNameEditForm.bind(this));
  }

  async setStationListTemplate() {
    try {
      const stationData = await requestGetStationList();
      this.userDataManager.setStationData(stationData);
      this.cacheStationListTemplate();
    } catch (error) {
      alert(error.message);
    }
  }

  renderStationList() {
    this.$stationListWrapper.innerHTML = this.stationListTemplate;
  }

  async handleStationForm(e) {
    e.preventDefault();

    const stationName = e.target[ELEMENT.STATION_NAME].value;

    try {
      validateName(stationName);
      const stationData = await requestAddStation({ name: stationName });
      this.userDataManager.setStationData(stationData);
      this.renderAddedStation(stationName);
      e.target[ELEMENT.STATION_NAME].value = '';
      this.cleanCacheStationListTemplate();
    } catch (error) {
      alert(error.message);
    }
  }

  handleStationNameEditButton(e) {
    openModal(this.$modal);
    const { stationName } = e.target.closest(`.${ELEMENT.STATION_LIST_ITEM}`).dataset;
    this.stationNameInEdit = stationName;
    this.$modalStationNameEditInput.value = stationName;
    this.$modalStationNameEditInput.focus();
  }

  async handleStationNameEditForm(e) {
    e.preventDefault();

    const newStationName = e.target[ELEMENT.STATION_NAME].value;
    const stationId = this.userDataManager.getTargetStationId(this.stationNameInEdit);

    try {
      validateName(newStationName);
      await requestEditStationName({ id: stationId, name: newStationName });
      this.userDataManager.editStationName(this.stationNameInEdit, newStationName);
      this.renderEditedStation(newStationName);
      this.cleanCacheStationListTemplate();
      this.props.cleanLineCache();
      closeModal(this.$modal);
    } catch (error) {
      alert(error.message);
    }
  }

  async handleStationNameRemoveButton(e) {
    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) return;

    const { stationName } = e.target.closest(`.${ELEMENT.STATION_LIST_ITEM}`).dataset;
    const $stationListItem = $(`[data-station-name="${stationName}"]`);

    try {
      await requestRemoveStation({ id: this.userDataManager.getTargetStationId(stationName) });
      $stationListItem.remove();
      this.userDataManager.removeStation(stationName);
      this.cleanCacheStationListTemplate();
    } catch (error) {
      alert(error.message);
    }
  }

  cacheStationListTemplate() {
    this.stationListTemplate = this.userDataManager.stations
      .map((station) => getStationListTemplate(station.name))
      .join('');
  }

  cleanCacheStationListTemplate() {
    this.stationListTemplate = '';
  }

  renderAddedStation(stationName) {
    this.$stationListWrapper.insertAdjacentHTML('beforeend', getStationListTemplate(stationName));
  }

  renderEditedStation(newStationName) {
    const $stationListItem = $(`[data-station-name="${this.stationNameInEdit}"]`);
    $stationListItem.outerHTML = getStationListTemplate(newStationName);
  }
}

export default Stations;
