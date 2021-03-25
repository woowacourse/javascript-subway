import { $ } from '../utils/dom';
import { requestAddStation, requestEditStationName } from '../requestData/requestUserData';
import { validateName } from '../validators/validation';

class Stations {
  constructor() {
    this.stations = {};
    this.stationIdInEdit = '';
    this.stationTextNodeInEdit = '';
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
        this.handleStationNameRemove(e);
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
    const $editTarget = e.target.previousElementSibling;
    const stationName = $editTarget.innerText;

    this.setStationIdInEdit(stationName);
    this.setStationTextNodeInEdit($editTarget);

    this.$modalStationNameEditInput.value = stationName;
    this.$modalStationNameEditInput.focus();
  }

  async handleStationNameEditForm(e) {
    const newStationName = e.target['station-name'].value;

    try {
      validateName(newStationName);
      await requestEditStationName({ id: this.stationIdInEdit, name: newStationName });
      this.stationTextNodeInEdit.innerText = newStationName;
    } catch (error) {
      alert(error.message);
    }
  }

  setStation({ name: stationName, ...rest }) {
    this.stations[stationName] = { ...rest };
    this.renderStationList(stationName);
  }

  setStationIdInEdit(stationName) {
    this.stationIdInEdit = this.stations[stationName].id;
  }

  setStationTextNodeInEdit($targetNode) {
    this.stationTextNodeInEdit = $targetNode;
  }

  renderStationList(stationName) {
    this.$stationListWrapper.insertAdjacentHTML('beforeend', this.getStationListTemplate(stationName));
  }

  getStationListTemplate(stationName) {
    return `
      <li class="station-list-item d-flex items-center py-2">
        <span class="w-100 pl-2">${stationName}</span>
        <button type="button" class="station-list-item__edit-button bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
      <hr class="my-0" />
    `;
  }
}

export default Stations;
