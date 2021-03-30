import { $ } from '../utils/dom';
import { openModal, closeModal } from '../utils/modal';
import { getLineListTemplate, getEditLineModalTemplate, getAddLineModalTemplate } from '../templates/lines';
import { requestAddLine, requestGetLineList, requestEditLineData } from '../requestData/requestUserData';
import UserDataManager from '../model/UserDataManager';
import { validateAddLine, validateEditLine } from '../validators/validation';

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
    this.$createLineButton = $('.create-line-btn');
    this.$lineListWrapper = $('.line-list-wrapper');
    this.$modal = $('.modal');
  }

  bindEvent() {
    this.$createLineButton.addEventListener('click', this.handleCreateLineButton.bind(this));

    this.$lineListWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('line-list-item__edit-button')) {
        this.handleLineEditButton(e);
        return;
      }

      if (e.target.classList.contains('line-list-item__remove-button')) {
        this.handleLineRemoveButton(e);
      }
    });
  }

  selectModalDom() {
    this.$modalLineForm = $('.modal__line-form');
    this.$colorSelector = $('.subway-line-color-selector');
    this.$selectedColor = $('.selected-color');
  }

  bindModalEvent() {
    this.$modalLineForm.addEventListener('submit', (e) => {
      if ($('.add-modal')) {
        this.handleCreateLineForm(e);
        return;
      }

      if ($('.edit-modal')) {
        this.handleEditLineForm(e);
      }
    });

    this.$colorSelector.addEventListener('click', (e) => {
      if (!e.target.classList.contains('color-option')) return;
      const colorTemplate = e.target.outerHTML;
      const [lineColor] = e.target.classList;

      this.$selectedColor.querySelector('button').remove();
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
    this.$modal.innerHTML = getAddLineModalTemplate(this.userDataManager.stations);
    this.initModal();
    openModal(this.$modal);
  }

  initModal() {
    this.selectModalDom();
    this.bindModalEvent();
  }

  async handleCreateLineForm(e) {
    e.preventDefault();

    const lineName = e.target['subway-line-name'].value;
    const upStationId = this.userDataManager.getTargetStationId(e.target['up-station'].value);
    const downStationId = this.userDataManager.getTargetStationId(e.target['down-station'].value);
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
    this.$modal.querySelectorAll('input').forEach((input) => (input.value = ''));
  }

  handleLineEditButton(e) {
    const { lineName } = e.target.closest('.line-list-item').dataset;
    const editTargetLineData = this.userDataManager.getEditTargetLineData(lineName);

    this.lineNameInEdit = lineName;
    this.selectedLineColor = '';
    this.lineColorInEdit = this.userDataManager.getTargetLineColor(lineName);
    this.showLineEditModal(editTargetLineData);
  }

  showLineEditModal(lineData) {
    this.$modal.innerHTML = getEditLineModalTemplate(lineData);
    this.initModal();
    openModal(this.$modal);
  }

  async handleEditLineForm(e) {
    e.preventDefault();

    const newLineName = e.target['subway-line-name'].value;
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

  handleLineRemoveButton(e) {}

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
