import { $ } from '../utils/dom';
import { openModal, closeModal } from '../utils/modal';
import { validateName } from '../validators/validation';
import { getStationListTemplate } from '../templates/stations';
import UserDataManager from '../model/UserDataManager';
import { REMOVE_CONFIRM_MESSAGE, ELEMENT } from '../utils/constants';
import { httpClient } from '../api/httpClient';

class Stations {
  constructor() {
    this.stationNameInEdit = '';
    this.userDataManager = new UserDataManager();
  }

  async init() {
    this.selectDom();
    this.bindEvent();
    !this.userDataManager.stationListTemplate && (await this.setStationListTemplate());
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
    const stationData = await httpClient.get({ path: `/stations`, returnType: 'json' });
    if (!stationData) return;

    this.userDataManager.setStationData(stationData);
    this.userDataManager.cacheStationListTemplate();
  }

  renderStationList() {
    this.$stationListWrapper.innerHTML = this.userDataManager.stationListTemplate;
  }

  async handleStationForm(e) {
    e.preventDefault();

    const stationName = e.target[ELEMENT.STATION_NAME].value;

    try {
      validateName(stationName);
    } catch (error) {
      alert(error.message);
      return;
    }

    const stationData = await httpClient.post({ path: '/stations', body: { name: stationName }, returnType: 'json' });
    if (!stationData) return;

    this.userDataManager.setStationData(stationData);
    this.renderAddedStation(stationName);
    e.target[ELEMENT.STATION_NAME].value = '';
    this.userDataManager.cleanCacheStationListTemplate();
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
    } catch (error) {
      alert(error.message);
      return;
    }

    const nameEditSuccess = await httpClient.put({ path: `/stations/${stationId}`, body: { name: newStationName } });
    if (!nameEditSuccess) return;

    this.userDataManager.editStationName(this.stationNameInEdit, newStationName);
    this.renderEditedStation(newStationName);
    this.userDataManager.cleanCacheStationListTemplate();
    this.userDataManager.cleanCacheLineListTemplate();
    closeModal(this.$modal);
  }

  async handleStationNameRemoveButton(e) {
    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) return;

    const { stationName } = e.target.closest(`.${ELEMENT.STATION_LIST_ITEM}`).dataset;
    const $stationListItem = $(`[data-station-name="${stationName}"]`);
    const stationId = this.userDataManager.getTargetStationId(stationName);

    const removeSuccess = await httpClient.delete({ path: `/stations/${stationId}` });
    if (!removeSuccess) return;

    $stationListItem.remove();
    this.userDataManager.removeStation(stationName);
    this.userDataManager.cleanCacheStationListTemplate();
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
