import UserDataManager from '../model/UserDataManager';
import { $ } from '../utils/dom';
import { getLineOptionsTemplate, getTargetSectionListTemplate, getStationOptionsTemplate } from '../templates/sections';
import { openModal, closeModal } from '../utils/modal';
import { requestAddSection, requestGetTargetLineList, requestRemoveSection } from '../requestData/requestUserData';
import { ELEMENT, REMOVE_CONFIRM_MESSAGE } from '../utils/constants';

class Sections {
  constructor() {
    this.userDataManager = new UserDataManager();
  }

  init() {
    this.selectDOM();
    this.bindEvent();

    const [firstLineData] = this.userDataManager.lines;
    if (firstLineData) {
      this.renderLineOptionsTemplate();
      this.renderStationListInTargetLine(firstLineData.name);
    }
  }

  selectDOM() {
    this.$lineListWrapper = $(`.${ELEMENT.LINE_LIST_WRAPPER}`);
    this.lineOptionsWrapper = $(`.${ELEMENT.LINE_OPTIONS_WRAPPER}`);
    this.$createSectionButton = $(`.${ELEMENT.CREATE_SECTION_BUTTON}`);
    this.$modal = $(`.${ELEMENT.MODAL}`);
    this.$modalStationOptionsWrapper = $(`.${ELEMENT.MODAL_STATION_OPTIONS_WRAPPER}`);
    this.$modalLineOptionsWrapper = $(`.${ELEMENT.MODAL_LINE_OPTIONS_WRAPPER}`);
    this.$modalSectionForm = $(`.${ELEMENT.MODAL_SECTION_FORM}`);
  }

  bindEvent() {
    this.lineOptionsWrapper.addEventListener('change', (e) => {
      const selectedLineName = e.target.value;
      this.renderLineColor(this.userDataManager.getTargetLineColor(selectedLineName));
      this.renderStationListInTargetLine(selectedLineName);
    });

    this.$createSectionButton.addEventListener('click', this.handleCreateSectionButton.bind(this));
    this.$modalSectionForm.addEventListener('submit', this.handleCreateSectionForm.bind(this));

    this.$lineListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains(ELEMENT.SECTION_LIST_ITEM_REMOVE_BUTTON)) {
        this.handleRemoveSection(e);
      }
    });
  }

  renderLineOptionsTemplate() {
    const lineData = this.userDataManager.lines;
    this.renderLineColor(lineData[0].color);
    this.lineOptionsWrapper.innerHTML = getLineOptionsTemplate(lineData);
  }

  renderStationListInTargetLine(selectedLineName) {
    const stationNamesInTargetLine = this.userDataManager.getStationNamesInTargetLine(selectedLineName);
    this.$lineListWrapper.innerHTML = getTargetSectionListTemplate(stationNamesInTargetLine);
  }

  renderLineColor(newColor) {
    const [oldColor] = this.lineOptionsWrapper.classList;
    this.lineOptionsWrapper.classList.replace(oldColor, newColor);
  }

  handleCreateSectionButton() {
    this.showSectionModal();
    this.clearModalInput();
  }

  clearModalInput() {
    this.$modal.querySelectorAll(`.${ELEMENT.INPUT_FIELD}`).forEach((input) => (input.value = ''));
  }

  async handleCreateSectionForm(e) {
    e.preventDefault();

    const lineName = e.target[ELEMENT.SUBWAY_LINE_FOR_SECTION].value;
    const lineId = this.userDataManager.getTargetLineId(lineName);
    const upStationId = this.userDataManager.getTargetStationId(e.target[ELEMENT.UP_STATION].value);
    const downStationId = this.userDataManager.getTargetStationId(e.target[ELEMENT.DOWN_STATION].value);
    const distance = e.target.distance.valueAsNumber;
    const duration = e.target.duration.valueAsNumber;

    try {
      await requestAddSection({ id: lineId, upStationId, downStationId, distance, duration });
      await this.updateTargetLineData({ lineId, lineName });
      closeModal(this.$modal);
    } catch (error) {
      alert(error.message);
    }
  }

  async handleRemoveSection(e) {
    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) return;

    const lineName = this.lineOptionsWrapper.value;
    const lineId = this.userDataManager.getTargetLineId(lineName);
    const removeTargetStation = e.target.dataset.stationName;
    const removeTargetStationId = this.userDataManager.getTargetStationId(removeTargetStation);

    try {
      await requestRemoveSection({ lineId, stationId: removeTargetStationId });
      await this.updateTargetLineData({ lineId, lineName });
    } catch (error) {
      alert(error.message);
    }
  }

  async updateTargetLineData({ lineId, lineName }) {
    try {
      const targetLineList = await requestGetTargetLineList({ id: lineId });
      this.userDataManager.updateTargetLineData(targetLineList);
      this.renderStationListInTargetLine(lineName);
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
