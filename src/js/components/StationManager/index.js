import { $ } from '../../utils/dom.js';
import { SELECTOR } from '../../constants/constants.js';
import stationTemplate from './template.js';

export default class StationManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
  }

  render() {
    this.$content.innerHTML = stationTemplate;
    console.log(this.store.stations);
    $(SELECTOR.STATION_LIST).innerHTML = this.store.stations
      .map((station) => station.toListItemTemplate())
      .join('');
  }

  selectDOM() {
    this.stationNameForm = $(SELECTOR.STATION_NAME_FORM);
    this.stationNameInput = $(SELECTOR.STATION_NAME_INPUT);
  }

  bindEvents() {
    this.stationNameInput.addEventListener('input', () => {
      this.setInputValidity();
    });

    this.stationNameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.stationNameInput.reportValidity();
    });
  }

  setInputValidity() {
    const validityState = this.stationNameInput.validity;

    if (validityState.valueMissing) {
      this.stationNameInput.setCustomValidity('역 이름을 입력해 주세요.🙀');
    } else if (validityState.tooShort) {
      this.stationNameInput.setCustomValidity('2글자 이상 입력해 주세요.👾');
    } else if (validityState.patternMismatch) {
      this.stationNameInput.setCustomValidity(
        '공백, 특수문자를 제외한 한글을 입력해 주세요.🤓'
      );
    } else {
      this.stationNameInput.setCustomValidity('');
    }
  }
}
