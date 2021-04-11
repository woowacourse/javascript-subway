import Component from '../components/Component';
import {
  ID_SELECTOR,
  REQUEST_URL,
  ALERT_MESSAGE,
  MODAL_TYPE,
} from '../constants';
import { SECTION_TEMPLATE } from '../templates/sectionTemplate';
import { fetchSectionCreation } from '../utils/fetch';
import $ from '../utils/querySelector';
import Modal from './Modal';

class SectionModal extends Modal {
  constructor(props) {
    super(props);

    this._router = {
      [MODAL_TYPE.CREATION]: new SectionCreationComponent({
        accessTokenState: this.props.accessTokenState,
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
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = SECTION_TEMPLATE.MODAL;
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
    const url = REQUEST_URL + `/lines/${modalLineId}/sections`;
    const accessToken = this.props.accessTokenState.Data;
    const bodyData = {
      upStationId,
      downStationId,
      distance,
      duration,
    };

    try {
      await fetchSectionCreation(url, { accessToken, bodyData });

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

        return SECTION_TEMPLATE.CREATING_OPTION_IN_MODAL(
          line.id,
          line.name,
          isSelected
        );
      })
      .join('');
  }

  #loadStationSelectOption() {
    const stations = this.props.stationsState.Data;

    $(
      `#${ID_SELECTOR.SECTION_MODAL_FORM_UP_STATION_SELECT}`
    ).innerHTML = stations.map(station =>
      SECTION_TEMPLATE.CREATING_OPTION_IN_MODAL(station.id, station.name)
    );

    $(
      `#${ID_SELECTOR.SECTION_MODAL_FORM_DOWN_STATION_SELECT}`
    ).innerHTML = stations.map(station =>
      SECTION_TEMPLATE.CREATING_OPTION_IN_MODAL(station.id, station.name)
    );
  }
}

export default SectionModal;
