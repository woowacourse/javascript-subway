import Component from '../components/Component.js';
import { ID_SELECTOR, ALERT_MESSAGE, MODAL_TYPE } from '../constants.js';
import { SECTION_TEMPLATE } from '../templates/sectionTemplate.js';
import { fetchSectionCreation } from '../utils/fetch.js';
import $ from '../utils/querySelector.js';
import Modal from './Modal.js';

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

    const lineId =
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

    const accessToken = this.props.accessTokenState.Data;
    const bodyData = {
      upStationId,
      downStationId,
      distance,
      duration,
    };

    try {
      await fetchSectionCreation({ lineId, accessToken, bodyData });

      alert(ALERT_MESSAGE.SECTION_CREATION_SUCCESS);

      const pageLineId = $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).value;

      if (lineId === pageLineId) {
        this.props.renderSectionList(lineId);
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
