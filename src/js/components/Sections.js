import UserDataManager from '../model/UserDataManager';
import { $ } from '../utils/dom';
import { getLineOptionsTemplate, getTargetSectionListTemplate, getStationOptionsTemplate } from '../templates/sections';
import { openModal, closeModal } from '../utils/modal';
import { ELEMENT, REMOVE_CONFIRM_MESSAGE } from '../utils/constants';
import { httpClient } from '../api/httpClient';

class Sections {
  constructor() {
    this.userDataManager = new UserDataManager();
  }

  init() {
    const [firstLineData] = this.userDataManager.lines;
    this.selectDOM();
    this.bindEvent();
    firstLineData && this.renderFirstScreen(firstLineData);
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
      this.renderLineColor(this.userDataManager.getTargetLineData(selectedLineName).color);
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

  renderFirstScreen(firstLineData) {
    this.renderLineOptionsTemplate(firstLineData.color);
    this.renderStationListInTargetLine(firstLineData.name);
  }

  renderLineOptionsTemplate(firstLineColor) {
    const lineData = this.userDataManager.lines;
    this.renderLineColor(firstLineColor);
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
    const lineId = this.userDataManager.getTargetLineData(lineName).id;
    const upStationId = this.userDataManager.getTargetStationId(e.target[ELEMENT.UP_STATION].value);
    const downStationId = this.userDataManager.getTargetStationId(e.target[ELEMENT.DOWN_STATION].value);
    const distance = e.target.distance.valueAsNumber;
    const duration = e.target.duration.valueAsNumber;

    const addSuccess = await httpClient.post({
      path: `/lines/${lineId}/sections`,
      body: { upStationId, downStationId, distance, duration },
    });
    if (!addSuccess) return;

    const updateSuccess = await this.updateTargetLineData({ lineId, lineName });
    if (!updateSuccess) return;

    closeModal(this.$modal);
  }

  async handleRemoveSection(e) {
    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) return;

    const lineName = this.lineOptionsWrapper.value;
    const lineId = this.userDataManager.getTargetLineData(lineName).id;
    const removeTargetStation = e.target.dataset.stationName;
    const removeTargetStationId = this.userDataManager.getTargetStationId(removeTargetStation);

    const removeSuccess = await httpClient.delete({
      path: `/lines/${lineId}/sections?stationId=${removeTargetStationId}`,
    });
    if (!removeSuccess) return;

    await this.updateTargetLineData({ lineId, lineName });
  }

  async updateTargetLineData({ lineId, lineName }) {
    const targetLineList = await httpClient.get({ path: `/lines/${lineId}`, returnType: 'json' });
    if (!targetLineList) return;

    this.userDataManager.updateTargetLineData(targetLineList);
    this.renderStationListInTargetLine(lineName);

    return 'success';
  }

  showSectionModal() {
    this.$modalStationOptionsWrapper.innerHTML = getStationOptionsTemplate(this.userDataManager.stations);
    this.$modalLineOptionsWrapper.innerHTML = getLineOptionsTemplate(this.userDataManager.lines);
    openModal(this.$modal);
  }
}

export default Sections;
