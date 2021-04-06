import AddStation from './AddStation';
import EditStation from './EditStation';
import RemoveStation from './RemoveStation';
import { $ } from '../../utils/dom';
import UserDataManager from '../../model/UserDataManager';
import { ELEMENT, TYPE_JSON } from '../../utils/constants';
import { httpClient } from '../../api/httpClient';

export default class Stations {
  constructor() {
    this.userDataManager = new UserDataManager();
    this.addStation = new AddStation({ userDataManager: this.userDataManager });
    this.editStation = new EditStation({ userDataManager: this.userDataManager });
    this.removeStation = new RemoveStation({ userDataManager: this.userDataManager });
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
    this.$modalStationNameEditForm = $(`.${ELEMENT.MODAL_STATION_NAME_EDIT_FORM}`);
    this.editStation.selectDom();
  }

  bindEvent() {
    this.$stationForm.addEventListener('submit', (e) =>
      this.addStation.handleCreateStationForm(e, this.$stationListWrapper),
    );

    this.$stationListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains(ELEMENT.STATION_LIST_ITEM_EDIT_BUTTON)) {
        this.editStation.handleStationNameEditButton(e);

        return;
      }
      if (e.target.classList.contains(ELEMENT.STATION_LIST_ITEM_REMOVE_BUTTON)) {
        this.removeStation.handleStationNameRemoveButton(e);
      }
    });

    this.$modalStationNameEditForm.addEventListener('submit', (e) => this.editStation.handleStationNameEditForm(e));
  }

  async setStationListTemplate() {
    const stationData = await httpClient.get({ path: `/stations`, returnType: TYPE_JSON });
    if (!stationData) return;

    this.userDataManager.setStationData(stationData);
    this.userDataManager.cacheStationListTemplate();
  }

  renderStationList() {
    this.$stationListWrapper.innerHTML = this.userDataManager.stationListTemplate;
  }
}
