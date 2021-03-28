// 2단계에 구현 예정

class Stations {
  constructor() {
    this.stationListTemplate = '';
    this.stationNameInEdit = '';
    this.userDataManager = new UserDataManager();
  }

  init() {
    this.selectDom();
    this.bindEvent();
    this.renderStationList();
  }

  selectDom() {
    this.$stationForm = $('.station-form');
    this.$stationListWrapper = $('.station-list-wrapper');
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');
    this.$modalStationNameEditInput = $('.modal__station-name-edit-input');
    this.$modalStationNameEditForm = $('.modal__station-name-edit-form');
  }

  bindEvent() {
    this.$stationForm.addEventListener('submit', this.handleStationForm.bind(this));

    this.$stationListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('station-list-item__edit-button')) {
        this.handleStationNameEditButton(e);
        return;
      }

      if (e.target.classList.contains('station-list-item__remove-button')) {
        this.handleStationNameRemoveButton(e);
      }
    });

    this.$modalStationNameEditForm.addEventListener('submit', this.handleStationNameEditForm.bind(this));
  }

  async renderStationList() {
    try {
      if (!this.stationListTemplate) {
        const stationData = await requestGetStationList();
        this.userDataManager.setStationData(stationData);
        this.cacheStationListTemplate();
      }

      this.$stationListWrapper.insertAdjacentHTML('beforeend', this.stationListTemplate);
    } catch (error) {
      alert(error.message);
    }
  }

  async handleStationForm(e) {
    e.preventDefault();
    const stationName = e.target['station-name'].value;

    try {
      validateName(stationName);
      const stationData = await requestAddStation({ name: stationName });
      this.userDataManager.setStationData(stationData);
      this.renderAddedStation(stationData);
      e.target['station-name'].value = '';
      this.cleanCacheStationListTemplate();
    } catch (error) {
      alert(error.message);
    }
  }

  handleStationNameEditButton(e) {
    this.$modal.classList.add('open');
    const { stationName } = e.target.closest('.station-list-item').dataset;
    this.stationNameInEdit = stationName;

    this.$modalStationNameEditInput.value = stationName;
    this.$modalStationNameEditInput.focus();
  }

  async handleStationNameEditForm(e) {
    e.preventDefault();

    const newStationName = e.target['station-name'].value;
    const $stationListItem = $(`[data-station-name=${this.stationNameInEdit}]`);
    const $textNode = $stationListItem.querySelector('span');

    try {
      validateName(newStationName);
      await requestEditStationName({
        id: this.userDataManager.getStationId(this.stationNameInEdit),
        name: newStationName,
      });
      this.userDataManager.editStationName(this.stationNameInEdit, newStationName);

      $stationListItem.dataset.stationName = newStationName;
      $textNode.innerText = newStationName;
      this.cleanCacheStationListTemplate();
      this.$modalClose.click();
    } catch (error) {
      alert(error.message);
    }
  }

  async handleStationNameRemoveButton(e) {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const { stationName } = e.target.closest('.station-list-item').dataset;
    const $stationListItem = $(`[data-station-name=${stationName}]`);

    try {
      await requestRemoveStation({ id: this.userDataManager.getStationId(stationName) });
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
}

export default Stations;
