import { $ } from '../utils/dom';
import { openModal, closeModal } from '../utils/modal';
import { getLineListTemplate, getEditLineModalTemplate, getAddLineModalTemplate } from '../templates/lines';
import { requestAddLine, requestGetLineList } from '../requestData/requestUserData';
import UserDataManager from '../model/UserDataManager';
import { validateLineColor } from '../validators/validation';

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
    this.$modalLineForm.addEventListener('submit', this.handleCreateLineForm.bind(this));

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
      validateLineColor(this.selectedLineColor, this.userDataManager.getLineColors());
      const lineData = await requestAddLine({
        name: lineName,
        lineColor: this.selectedLineColor,
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

    // 노선 추가 타이틀을 '00호선 수정'으로 변경

    // 노선 이름, 상행역, 하행역, 거리, 시간, 색상 모두 입력되어 있어야 함
    // 상행역, 하행역, 거리, 시간은 수정 불가하도록 disabled로 attr 수정
    this.showLineEditModal(editTargetLineData);
  }

  showLineEditModal(lineData) {
    this.$modal.innerHTML = getEditLineModalTemplate(lineData);
    this.initModal();
    openModal(this.$modal);
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
}

export default Lines;
