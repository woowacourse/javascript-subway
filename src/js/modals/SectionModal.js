import Component from '../components/Component';
import {
  KEYWORD,
  ID_SELECTOR,
  REQUEST_URL,
  ALERT_MESSAGE,
  LOCAL_STORAGE_KEY,
} from '../constants';
import SECTION_TEMPLATE from '../templates/sectionTemplate';
import { fetchSectionCreation } from '../utils/fetch';
import $ from '../utils/querySelector';
import { createOptionTemplate } from '../utils/template';
import Modal from './Modal';

class SectionModal extends Modal {
  constructor(props) {
    super(props);

    this._router = {
      [KEYWORD.CREATION]: new SectionCreationComponent({
        stationsState: this.props.stationsState,
        linesState: this.props.linesState,
        renderSectionList: this.props.renderSectionList,
      }),
    };
  }
}

class SectionCreationComponent extends Component {
  constructor(props) {
    super(props);
  }

  initEvent() {
    $(`#${ID_SELECTOR.SECTION_MODAL_FORM}`).addEventListener(
      'submit',
      this.#onSectionCreated
    );
  }

  initLoad() {
    this.#loadLineSelectOption();
    this.#loadStationSelectOption();
  }

  render() {
    $(`#${ID_SELECTOR.MODAL}`).innerHTML =
      SECTION_TEMPLATE.DEFAULT_MODAL_COMPONENT;
  }

  #onSectionCreated = async event => {
    event.preventDefault();

    const modalLineId =
      event.target[ID_SELECTOR.SECTION_MODAL_FORM_LINE_SELECT].value;
    const upStationId =
      event.target[ID_SELECTOR.SECTION_MODAL_FORM_UP_STATION_SELECT].value;
    const downStationId =
      event.target[ID_SELECTOR.SECTION_MODAL_FORM_DOWN_STATION_SELECT].value;

    if (upStationId === downStationId) {
      alert(ALERT_MESSAGE.STATIONS_SETTING_OF_SECTION_CREATION_FAIL);
      return;
    }

    const distance =
      event.target[ID_SELECTOR.SECTION_MODAL_FORM_DISTANCE].value;
    const duration =
      event.target[ID_SELECTOR.SECTION_MODAL_FORM_DURATION].value;
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const bodyData = {
      upStationId,
      downStationId,
      distance,
      duration,
    };

    try {
      await fetchSectionCreation({
        accessToken,
        bodyData,
        lineId: modalLineId,
      });

      alert(ALERT_MESSAGE.SECTION_CREATION_SUCCESS);

      const pageLineId = $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).value;

      if (modalLineId === pageLineId) {
        this.props.renderSectionList(modalLineId);
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  #loadLineSelectOption() {
    const lines = this.props.linesState.Data;
    const pageLineId = Number($(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).value);

    $(`#${ID_SELECTOR.SECTION_MODAL_FORM_LINE_SELECT}`).innerHTML = lines
      .map(line => {
        const isSelected = line.id === pageLineId;
        return createOptionTemplate(line.id, line.name, isSelected);
      })
      .join('');
  }

  #loadStationSelectOption() {
    const stations = this.props.stationsState.Data;

    $(
      `#${ID_SELECTOR.SECTION_MODAL_FORM_UP_STATION_SELECT}`
    ).innerHTML = stations.map(station =>
      createOptionTemplate(station.id, station.name)
    );

    $(
      `#${ID_SELECTOR.SECTION_MODAL_FORM_DOWN_STATION_SELECT}`
    ).innerHTML = stations.map(station =>
      createOptionTemplate(station.id, station.name)
    );
  }
}

export default SectionModal;
