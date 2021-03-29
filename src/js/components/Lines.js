import { $ } from '../utils/dom';
import { selectedColorTemplate, getStationOptionsTemplate, getLineListTemplate } from '../templates/lines';
import { requestAddLine } from '../requestData/requestUserData';
import UserDataManager from '../model/UserDataManager';

class Lines {
  constructor() {
    this.selectedLineColor = '';
    this.lineListTemplate = '';
    this.userDataManager = new UserDataManager();
  }

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$lineListWrapper = $('.line-list-wrapper');
    this.$createLineButton = $('.create-line-btn');
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');
    this.$modalLineForm = $('.modal__line-form');
    this.$colorSelector = $('.subway-line-color-selector');
    this.$selectedColor = $('.selected-color');
    this.$stationOptionWrapper = $('.station-option-wrapper');
  }

  bindEvent() {
    this.$createLineButton.addEventListener('click', this.handleCreateLineButton.bind(this));
    this.$modalLineForm.addEventListener('submit', this.handleCreateLineForm.bind(this));

    this.$colorSelector.addEventListener('click', (e) => {
      if (!e.target.classList.contains('color-option')) return;
      const colorTemplate = e.target.outerHTML;
      const color = e.target.classList[1];

      this.$selectedColor.querySelector('button').remove();
      this.$selectedColor.insertAdjacentHTML('afterbegin', colorTemplate);
      this.selectedLineColor = color;
    });
  }

  handleCreateLineButton() {
    this.$selectedColor.innerHTML = selectedColorTemplate();
    this.selectedLineColor = '';
    this.$stationOptionWrapper.innerHTML = getStationOptionsTemplate(this.userDataManager.stations);
    this.$modal.classList.add('open');
  }

  async handleCreateLineForm(e) {
    e.preventDefault();
    if (!this.selectedLineColor) {
      alert('색을 선택해주세요.');
      return;
    }

    const lineName = e.target['subway-line-name'].value;
    const upStationId = this.userDataManager.getStationId(e.target['up-station'].value);
    const downStationId = this.userDataManager.getStationId(e.target['down-station'].value);
    const distance = e.target.distance.valueAsNumber;
    const duration = e.target.duration.valueAsNumber;

    try {
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
      this.$modalClose.click();
    } catch (error) {
      alert(error.message);
    }
  }

  cacheLineListTemplate() {
    this.lineListTemplate = this.userDataManager.lines
      .map((line) => getLineListTemplate({ lineName: line.name, color: line.color }))
      .join('');
  }

  cleanCacheLineListTemplate() {
    this.lineListTemplate = '';
  }

  renderAddedLine(lineName) {
    this.$lineListWrapper.insertAdjacentHTML(
      'beforeend',
      getLineListTemplate({ lineName, color: this.selectedLineColor }),
    );
  }
}

export default Lines;
