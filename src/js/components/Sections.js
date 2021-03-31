import UserDataManager from '../model/UserDataManager';
import { $ } from '../utils/dom';
import { getLineOptionsTemplate, getTargetSectionListTemplate, getStationOptionsTemplate } from '../templates/sections';
import { openModal, closeModal } from '../utils/modal';
import { requestAddSection, requestGetTargetLineList } from '../requestData/requestUserData';

class Sections {
  constructor() {
    this.userDataManager = new UserDataManager();
  }

  init() {
    this.selectDOM();
    this.bindEvent();
    this.renderLineOptionsTemplate();
    this.renderStationListInTargetLine(this.userDataManager.lines[0].name);
  }

  selectDOM() {
    this.$listWrapper = $('.list-wrapper');
    this.$lineOptions = $('.line-options');
    this.$createSectionButton = $('.create-section-button');
    this.$modal = $('.modal');
    this.$modalStationOptionsWrapper = $('.modal__station-options-wrapper');
    this.$modalLineOptionsWrapper = $('.modal__line-options-wrapper');
    this.$modalSectionForm = $('.modal__section-form');
  }

  bindEvent() {
    this.$lineOptions.addEventListener('change', (e) => {
      const selectedLineName = e.target.value;
      this.renderLineColor(this.userDataManager.getTargetLineColor(selectedLineName));
      this.renderStationListInTargetLine(selectedLineName);
    });

    this.$createSectionButton.addEventListener('click', this.handleCreateSectionButton.bind(this));
    this.$modalSectionForm.addEventListener('submit', this.handleCreateSectionForm.bind(this));
  }

  renderLineOptionsTemplate() {
    const lineData = this.userDataManager.lines;
    this.renderLineColor(lineData[0].color);
    this.$lineOptions.innerHTML = getLineOptionsTemplate(lineData);
  }

  renderStationListInTargetLine(selectedLineName) {
    const stationNamesInTargetLine = this.userDataManager.getStationNamesInTargetLine(selectedLineName);
    this.$listWrapper.innerHTML = getTargetSectionListTemplate(stationNamesInTargetLine);
  }

  renderLineColor(newColor) {
    const [oldColor] = this.$lineOptions.classList;
    this.$lineOptions.classList.replace(oldColor, newColor);
  }

  handleCreateSectionButton() {
    this.showSectionModal();
  }

  async handleCreateSectionForm(e) {
    e.preventDefault();

    const lineName = e.target['subway-line-for-section'].value;
    const lineId = this.userDataManager.getTargetLineId(lineName);
    const upStationId = this.userDataManager.getTargetStationId(e.target['up-station'].value);
    const downStationId = this.userDataManager.getTargetStationId(e.target['down-station'].value);
    const distance = e.target.distance.valueAsNumber;
    const duration = e.target.duration.valueAsNumber;

    try {
      await requestAddSection({ id: lineId, upStationId, downStationId, distance, duration });
      const updatedTargetLine = await requestGetTargetLineList({ id: lineId });
      this.userDataManager.updateTargetLineData(updatedTargetLine);
      this.renderStationListInTargetLine(lineName);
      closeModal(this.$modal);
    } catch (error) {
      alert(error.message);
    }
  }

  showSectionModal() {
    this.$modalStationOptionsWrapper.innerHTML = getStationOptionsTemplate(this.userDataManager.stations);
    this.$modalLineOptionsWrapper.innerHTML = getLineOptionsTemplate(this.userDataManager.lines);
    openModal(this.$modal);
  }
}

export default Sections;
