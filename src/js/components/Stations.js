import { $ } from '../utils/dom';
import { requestAddStation, requestEditStationName, requestRemoveStation } from '../requestData/requestUserData';
import { validateName } from '../validators/validation';

class Stations {
  constructor() {
    this.stations = [];
    this.stationNameInEdit = '';
  }

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$stationForm = $('.station-form');
    this.$stationListWrapper = $('.station-list-wrapper');
    this.$modal = $('.modal');
    this.$modalStationNameEditInput = $('.modal__station-name-edit-input');
    this.$modalStationNameEditForm = $('.modal__station-name-edit-form');
  }

  bindEvent() {
    this.$stationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleStationForm(e);
    });

    this.$stationListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('station-list-item__edit-button')) {
        this.handleStationNameEditButton(e);
        return;
      }

      if (e.target.classList.contains('station-list-item__remove-button')) {
        this.handleStationNameRemoveButton(e);
      }
    });

    this.$modalStationNameEditForm.addEventListener('submit', (e) => {
      e.preventDefault();

      this.handleStationNameEditForm(e);
    });
  }

  async handleStationForm({ target }) {
    const stationName = target['station-name'].value;

    try {
      validateName(stationName);
      const stationData = await requestAddStation({ name: stationName });
      this.setStation(stationData);
      target['station-name'].value = '';
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
    const newStationName = e.target['station-name'].value;
    const $stationListItem = $(`[data-station-name=${this.stationNameInEdit}]`);
    const $textNode = $stationListItem.querySelector('span');

    try {
      validateName(newStationName);
      await requestEditStationName({ id: this.getStationId(this.stationNameInEdit), name: newStationName });
      this.stations.find((station) => station.name === this.stationNameInEdit).name = newStationName;

      $stationListItem.dataset.stationName = newStationName;
      $textNode.innerText = newStationName;
    } catch (error) {
      alert(error.message);
    }
  }

  async handleStationNameRemoveButton(e) {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const { stationName } = e.target.closest('.station-list-item').dataset;
    const $stationListItem = $(`[data-station-name=${stationName}]`);

    try {
      await requestRemoveStation({ id: this.getStationId(stationName) });
      $stationListItem.remove();
      this.stations = this.stations.filter((station) => station.name !== stationName);
    } catch (error) {
      alert(error.message);
    }
  }

  setStation(stationData) {
    this.stations = [stationData, ...this.stations];
    this.renderStationList(stationData.name);
  }

  getStationId(stationName) {
    return this.stations.find((station) => station.name === stationName).id;
  }

  renderStationList(stationName) {
    this.$stationListWrapper.insertAdjacentHTML('afterbegin', this.getStationListTemplate(stationName));
  }

  getStationListTemplate(stationName) {
    return `
      <li class="station-list-item" data-station-name=${stationName}>
        <div class="d-flex items-center py-2">
          <span class="w-100 pl-2">${stationName}</span>
          <button 
            type="button"      
            class="station-list-item__edit-button bg-gray-50 text-gray-500 text-sm mr-1" 
            >
              수정
          </button>
          <button 
            type="button" 
            class="station-list-item__remove-button bg-gray-50 text-gray-500 text-sm" 
            >
              삭제
          </button>
        </div>
        <hr class="my-0" />
      </li>
    `;
  }
}

export default Stations;
