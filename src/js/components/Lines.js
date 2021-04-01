import { $ } from '../utils/dom';
import { openModal, closeModal } from '../utils/modal';
import { getLineListTemplate, getLineEditModalTemplate, getLineAddModalTemplate } from '../templates/lines';
import {
  requestAddLine,
  requestGetLineList,
  requestEditLineData,
  requestRemoveLine,
} from '../requestData/requestUserData';
import UserDataManager from '../model/UserDataManager';
import { validateAddLine, validateEditLine } from '../validators/validation';
import { ELEMENT, REMOVE_CONFIRM_MESSAGE } from '../utils/constants';

class Lines {
  constructor() {
    this.selectedLineColor = '';
    this.lineListTemplate = '';
    this.lineNameInEdit = '';
    this.userDataManager = new UserDataManager();
  }

  async init() {
    this.selectDom();
    this.bindEvent();
    !this.lineListTemplate && (await this.setLineListTemplate());
    this.renderLineList();
  }

  selectDom() {
    this.$createLineButton = $(`.${ELEMENT.CREATE_LINE_BUTTON}`);
    this.$lineListWrapper = $(`.${ELEMENT.LINE_LIST_WRAPPER}`);
    this.$modal = $(`.${ELEMENT.MODAL}`);
  }

  bindEvent() {
    this.$createLineButton.addEventListener('click', this.handleCreateLineButton.bind(this));

    this.$lineListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains(ELEMENT.LINE_LIST_ITEM_EDIT_BUTTON)) {
        this.handleLineEditButton(e);
        return;
      }

      if (e.target.classList.contains(ELEMENT.LINE_LIST_ITEM_REMOVE_BUTTON)) {
        this.handleLineRemoveButton(e);
      }
    });
  }

  selectModalDom() {
    this.$modalLineForm = $(`.${ELEMENT.MODAL_LINE_FORM}`);
    this.$colorSelector = $(`.${ELEMENT.LINE_COLOR_SELECTOR}`);
    this.$selectedColor = $(`.${ELEMENT.SELECTED_COLOR}`);
  }

  bindModalEvent() {
    this.$modalLineForm.addEventListener('submit', (e) => {
      if ($(`.${ELEMENT.ADD_MODAL}`)) {
        this.handleCreateLineForm(e);

        return;
      }

      if ($(`.${ELEMENT.EDIT_MODAL}`)) {
        this.handleEditLineForm(e);
      }
    });

    this.$colorSelector.addEventListener('click', (e) => {
      if (!e.target.classList.contains(ELEMENT.COLOR_OPTION)) return;

      const colorTemplate = e.target.outerHTML;
      const [lineColor] = e.target.classList;

      this.$selectedColor.querySelector(`.${ELEMENT.COLOR_OPTION}`).remove();
      this.$selectedColor.insertAdjacentHTML('afterbegin', colorTemplate);
      this.selectedLineColor = lineColor;
    });
  }

  async setLineListTemplate() {
    try {
      const lineData = await requestGetLineList();

      this.userDataManager.setLineData(lineData);
      this.cacheLineListTemplate();
    } catch (error) {
      alert(error.message);
    }
  }

  renderLineList() {
    this.$lineListWrapper.innerHTML = this.lineListTemplate;
  }

  handleCreateLineButton() {
    this.selectedLineColor = '';
    this.showLineAddModal();
  }

  showLineAddModal() {
    this.$modal.innerHTML = getLineAddModalTemplate(this.userDataManager.stations);
    this.initModal();
    openModal(this.$modal);
  }

  initModal() {
    this.selectModalDom();
    this.bindModalEvent();
  }

  async handleCreateLineForm(e) {
    e.preventDefault();

    const lineName = e.target[ELEMENT.SUBWAY_LINE_NAME].value;
    const upStationId = this.userDataManager.getTargetStationId(e.target[ELEMENT.UP_STATION].value);
    const downStationId = this.userDataManager.getTargetStationId(e.target[ELEMENT.DOWN_STATION].value);
    const distance = e.target.distance.valueAsNumber;
    const duration = e.target.duration.valueAsNumber;

    try {
      validateAddLine({
        lineName,
        upStationId,
        downStationId,
        selectedLineColor: this.selectedLineColor,
        lineColorList: this.userDataManager.getLineColors(),
      });

      const lineData = await requestAddLine({
        name: lineName,
        color: this.selectedLineColor,
        upStationId,
        downStationId,
        distance,
        duration,
      });

      this.userDataManager.setLineData(lineData);
      this.renderAddedLine(lineName);
      this.cleanCacheLineListTemplate();

      closeModal(this.$modal);
    } catch (error) {
      alert(error.message);
    }
  }

  clearModalInput() {
    this.$modal.querySelectorAll(`.${ELEMENT.INPUT_FIELD}`).forEach((input) => (input.value = ''));
  }

  handleLineEditButton(e) {
    const { lineName } = e.target.closest(`.${ELEMENT.LINE_LIST_ITEM}`).dataset;
    const editTargetLineData = this.userDataManager.getTargetLineDataForEdit(lineName);

    this.lineNameInEdit = lineName;
    this.selectedLineColor = '';
    this.lineColorInEdit = this.userDataManager.getTargetLineColor(lineName);
    this.showLineEditModal(editTargetLineData);
  }

  showLineEditModal(lineData) {
    this.$modal.innerHTML = getLineEditModalTemplate(lineData);
    this.initModal();
    openModal(this.$modal);
  }

  async handleEditLineForm(e) {
    e.preventDefault();

    const newLineName = e.target[ELEMENT.SUBWAY_LINE_NAME].value;
    const newColor = this.selectedLineColor || this.lineColorInEdit;
    const lineIdInEdit = this.userDataManager.getTargetLineId(this.lineNameInEdit);

    try {
      validateEditLine({
        lineName: newLineName,
        selectedLineColor: this.selectedLineColor,
        lineColorList: this.userDataManager.getLineColors(),
      });

      await requestEditLineData({ id: lineIdInEdit, name: newLineName, color: newColor });

      this.userDataManager.editLineData({
        oldLineName: this.lineNameInEdit,
        newLineName,
        newColor,
      });

      this.renderEditedLine(newLineName, newColor);
      this.cleanCacheLineListTemplate();
      closeModal(this.$modal);
    } catch (error) {
      alert(error.message);
    }
  }

  async handleLineRemoveButton(e) {
    if (!window.confirm(REMOVE_CONFIRM_MESSAGE)) return;

    const { lineName } = e.target.closest(`.${ELEMENT.LINE_LIST_ITEM}`).dataset;
    const $lineListItem = $(`[data-line-name="${lineName}"]`);

    try {
      await requestRemoveLine({ id: this.userDataManager.getTargetLineId(lineName) });
      $lineListItem.remove();
      this.userDataManager.removeLine(lineName);
      this.cleanCacheLineListTemplate();
    } catch (error) {
      alert(error.message);
    }
  }

  cacheLineListTemplate() {
    this.lineListTemplate = this.userDataManager.lines
      .map((line) => getLineListTemplate({ lineName: line.name, lineColor: line.color }))
      .join('');
  }

  cleanCacheLineListTemplate() {
    this.lineListTemplate = '';
  }

  renderAddedLine(lineName) {
    this.$lineListWrapper.insertAdjacentHTML(
      'beforeend',
      getLineListTemplate({ lineName, lineColor: this.selectedLineColor }),
    );
  }

  renderEditedLine(newLineName, newLineColor) {
    const $lineListItem = $(`[data-line-name="${this.lineNameInEdit}"]`);
    $lineListItem.outerHTML = getLineListTemplate({ lineName: newLineName, lineColor: newLineColor });
  }
}

export default Lines;
