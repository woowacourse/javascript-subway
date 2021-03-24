import { $ } from '../utils/dom';
import { requestAddStation } from '../requestData/requestUserData';

class Stations {
  constructor() {
    this.stations = [];
  }

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$stationForm = $('.station-form');
    this.$stationListWrapper = $('.station-list-wrapper');
  }

  bindEvent() {
    this.$stationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleStationSubmit(e);
    });
  }

  setStation(stationName) {
    this.stations.push(stationName);
    this.renderStationList(stationName);
  }

  async handleStationSubmit({ target }) {
    const stationName = target['station-name'].value;

    try {
      await requestAddStation({ name: stationName });
      this.setStation(stationName);
    } catch (error) {
      alert('역 생성에 실패했습니다.');
    }
  }

  renderStationList(stationName) {
    this.$stationListWrapper.insertAdjacentHTML('beforeend', this.getStationListTemplate(stationName));
  }

  getStationListTemplate(stationName) {
    return `
      <li class="station-list-item d-flex items-center py-2">
        <span class="w-100 pl-2">${stationName}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
      <hr class="my-0" />
    `;
  }
}

export default Stations;
