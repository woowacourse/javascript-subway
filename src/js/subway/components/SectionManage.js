import { getFromSessionStorage, show, $ } from '../../@shared/utils';
import { DOM } from '../constants/dom';
import { ROUTE, SESSION_KEY, STATE_KEY, SUBMIT_TYPE, UP_STATION, DOWN_STATION, MESSAGE } from '../constants/constants';
import {
  hideModal,
  isValidDistance,
  isValidDuration,
  lineManageAPI,
  sectionManageAPI,
  showModal,
  stationManageAPI,
} from '../utils';
import { subwayView } from '../views';
import { store } from '../../@shared/models/store';

export class SectionManage {
  constructor(props) {
    this.props = props;
    this.setup();
    this.bindEvent();
  }

  setup() {
    store[STATE_KEY.ROUTE].subscribe(this.updateStationOptions.bind(this));
    store[STATE_KEY.ROUTE].subscribe(this.updateLineOptions.bind(this));
  }

  async updateStationOptions(route) {
    if (route !== ROUTE.SECTIONS) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      if (this.props.cache.stations.length === 0) {
        this.props.cache.stations = await stationManageAPI.getStations(accessToken);
      }

      subwayView.renderStationOptions(DOM.SECTION.MODAL.UP_STATION_SELECTOR, UP_STATION, this.props.cache.stations);
      subwayView.renderStationOptions(DOM.SECTION.MODAL.DOWN_STATION_SELECTOR, DOWN_STATION, this.props.cache.stations);
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateLineOptions(route) {
    if (route !== ROUTE.SECTIONS) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      if (this.props.cache.lines.length === 0) {
        this.props.cache.lines = await lineManageAPI.getLines(accessToken);
      }

      subwayView.renderLineOptions(this.props.cache.lines);
      DOM.SECTION.MAIN.LINE_COLOR_BAR.classList.add('hidden');
      subwayView.renderSectionList();
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateSections() {
    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      const lineId = Number(DOM.SECTION.MAIN.LINE_SELECTOR.value);

      if (this.props.cache.lines.length === 0) {
        this.props.cache.lines = await lineManageAPI.getLines(accessToken);
      }

      const { stations } = this.props.cache.lines.find(line => line.id === lineId);

      subwayView.renderSectionList(stations);
    } catch (error) {
      console.error(error.message);
    }
  }

  bindEvent() {
    DOM.SECTION.MAIN.ADD_MODAL_BUTTON.addEventListener('click', this.handleAddButton.bind(this));
    DOM.SECTION.MAIN.LINE_SELECTOR.addEventListener('change', this.handleLineSelector.bind(this));
    DOM.SECTION.MODAL.FORM.addEventListener('submit', this.handleSectionSubmit.bind(this));
    DOM.SECTION.MAIN.LIST.addEventListener('click', this.handleRemoveButton.bind(this));
  }

  handleAddButton() {
    const lineId = DOM.SECTION.MAIN.LINE_SELECTOR.value;

    if (!lineId) {
      alert(MESSAGE.SECTION_MANAGE.LINE_SELECT_REQUIRED);

      return;
    }
    DOM.SECTION.MODAL.FORM.dataset.lineId = lineId;

    DOM.SECTION.MODAL.LINE_NAME.value = $(`option[value='${lineId}']`, DOM.SECTION.MAIN.LINE_SELECTOR).innerText;
    DOM.SECTION.MODAL.MSG.innerText = '';

    show(DOM.SECTION.MODAL.NON_MODIFIABLE);
    showModal(DOM.CONTAINER.MODAL);
  }

  handleLineSelector(event) {
    const id = Number(event.target.value);
    const { color, stations } = this.props.cache.lines.find(line => line.id === id);

    subwayView.fillLineColorBar(color);
    subwayView.renderSectionList(stations);
  }

  handleSectionSubmit(event) {
    event.preventDefault();
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

    this.handleAddSubmit(accessToken);
  }

  async handleAddSubmit(accessToken) {
    const requestInfo = {
      id: DOM.SECTION.MODAL.FORM.dataset.lineId,
      upStationId: DOM.SECTION.MODAL.UP_STATION_SELECTOR.value,
      downStationId: DOM.SECTION.MODAL.DOWN_STATION_SELECTOR.value,
      distance: DOM.SECTION.MODAL.DISTANCE_INPUT.value,
      duration: DOM.SECTION.MODAL.DURATION_INPUT.value,
    };

    if (requestInfo.upStationId === requestInfo.downStationId) {
      DOM.LINE.MODAL.MSG.innerText = MESSAGE.LINE_MANAGE.SAME_STATIONS;

      return;
    }

    if (!(isValidDistance(requestInfo.distance) && isValidDuration(requestInfo.duration))) {
      DOM.LINE.MODAL.MSG.innerText = MESSAGE.LINE_MANAGE.INVALID_DISTANCE_DURATION;

      return;
    }

    try {
      await sectionManageAPI.addSection(accessToken, requestInfo);
      this.props.cache.lines = [];
      await this.updateSections();
      DOM.SECTION.MODAL.FORM.reset();
      hideModal(DOM.CONTAINER.MODAL);
    } catch (error) {
      DOM.SECTION.MODAL.MSG.innerText = error.message;
    }
  }

  async handleRemoveButton({ target }) {
    if (!target.classList.contains('js-remove-button')) return;
    const $station = target.closest('.js-station-list-item');
    const requestInfo = {
      lineId: DOM.SECTION.MAIN.LINE_SELECTOR.value,
      stationId: $station.dataset.stationId,
    };

    if (!confirm(MESSAGE.CONFIRM.STATION_REMOVE)) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);

      await sectionManageAPI.removeSection(accessToken, requestInfo);
      this.props.cache.lines = [];
      this.updateSections();
    } catch (error) {
      alert(error.message);
    }
  }
}
