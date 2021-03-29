import { getFromSessionStorage, show, $ } from '../../@shared/utils';
import { DOM } from '../constants/dom';
import { ROUTE, SESSION_KEY, STATE_KEY, SUBMIT_TYPE, UP_STATION, DOWN_STATION } from '../constants/constants';
import { lineManageAPI, showModal, stationManageAPI } from '../utils';
import { subwayView } from '../views';
import { store } from '../../@shared/models/store';

export class SectionManage {
  constructor(props) {
    this.props = props;
    this.submitType = null;
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
    } catch (error) {
      console.error(error.message);
    }
  }

  bindEvent() {
    DOM.SECTION.MAIN.ADD_MODAL_BUTTON.addEventListener('click', this.handleAddButton.bind(this));
    DOM.SECTION.MAIN.LINE_SELECTOR.addEventListener('change', this.handleLineSelector.bind(this));
  }

  handleAddButton() {
    this.submitType = SUBMIT_TYPE.ADD;
    const lineId = DOM.SECTION.MAIN.LINE_SELECTOR.value;

    if (!lineId) {
      alert('노선을 선택해 주세요.');

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
    const { color, sections } = this.props.cache.lines.find(line => line.id === id);

    subwayView.fillLineColorBar(color);
    subwayView.renderSectionList(sections);
  }
}
