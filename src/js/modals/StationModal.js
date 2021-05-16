import Component from '../components/Component.js';
import { ALERT_MESSAGE, ID_SELECTOR, MODAL_TYPE } from '../constants.js';
import { STATION_TEMPLATE } from '../templates/stationTemplate.js';
import { closeModal } from '../utils/DOM.js';
import { fetchStationNameUpdate } from '../utils/fetch.js';
import { loadStationList } from '../utils/loadByAJAX.js';
import $ from '../utils/querySelector.js';
import Modal from './Modal.js';

class StationModal extends Modal {
  constructor(props) {
    super(props);

    this._router = {
      [MODAL_TYPE.UPDATE]: new StationUpdateComponent({
        accessTokenState: this.props.accessTokenState,
        stationsState: this.props.stationsState,
      }),
    };
  }
}

class StationUpdateComponent extends Component {
  constructor(props) {
    super(props);
  }

  initLoad() {
    this.#loadUpdateModal();
  }

  initEvent() {
    $(`#${ID_SELECTOR.STATION_MODAL_FORM}`).addEventListener(
      'submit',
      this.#onUpdateSubmit
    );
  }

  render() {
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = STATION_TEMPLATE.MODAL;
  }

  #loadUpdateModal() {
    const stationId = $(`#${ID_SELECTOR.MODAL}`).dataset.stationId;
    const stationName = $(`#${ID_SELECTOR.MODAL}`).dataset.stationName;

    $(`#${ID_SELECTOR.STATION_MODAL_FORM_INPUT}`).value = stationName;
    $(`#${ID_SELECTOR.STATION_MODAL_FORM_INPUT}`).dataset.id = stationId;
  }

  #onUpdateSubmit = async event => {
    event.preventDefault();

    const $input = event.target[ID_SELECTOR.STATION_MODAL_FORM_INPUT];
    const updatingName = $input.value;
    const originalName = $(`#${ID_SELECTOR.MODAL}`).dataset.stationName;

    if (updatingName === originalName) {
      alert(ALERT_MESSAGE.STATION_NAME_UPDATE_FAIL);
      return;
    }

    const stationId = $input.dataset.id;
    const bodyData = {
      name: updatingName,
    };
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchStationNameUpdate({ stationId, bodyData, accessToken });
      alert(ALERT_MESSAGE.STATION_NAME_UPDATE_SUCCESS);
      closeModal();
      loadStationList(
        this.props.stationsState,
        this.props.accessTokenState.Data
      );
    } catch (err) {
      alert(err.message);
      return;
    }
  };
}

export default StationModal;
