import Component from '../components/Component';
import {
  ALERT_MESSAGE,
  ID_SELECTOR,
  KEYWORD,
  LOCAL_STORAGE_KEY,
  REQUEST_URL,
} from '../constants';
import STATION_TEMPLATE from '../templates/stationTemplate';
import { closeModal } from '../utils/DOM';
import { fetchStationNameRevision } from '../utils/fetch';
import { loadStationList } from '../utils/loadByAJAX';
import $ from '../utils/querySelector';
import Modal from './Modal';

class StationModal extends Modal {
  constructor(props) {
    super(props);

    this._router = {
      [KEYWORD.REVISION]: new StationRevisionComponent({
        stationsState: this.props.stationsState,
      }),
    };
  }
}

class StationRevisionComponent extends Component {
  constructor(props) {
    super(props);
  }

  initLoad() {
    this.#loadRevisionModal();
  }

  initEvent() {
    $(`#${ID_SELECTOR.STATION_MODAL_FORM}`).addEventListener(
      'submit',
      this.#onRevisionSubmit
    );
  }

  render() {
    $(`#${ID_SELECTOR.MODAL}`).innerHTML =
      STATION_TEMPLATE.DEFAULT_MODAL_COMPONENT;
  }

  #loadRevisionModal() {
    const stationId = $(`#${ID_SELECTOR.MODAL}`).dataset.stationId;
    const stationName = $(`#${ID_SELECTOR.MODAL}`).dataset.stationName;

    $(`#${ID_SELECTOR.STATION_MODAL_FORM_INPUT}`).value = stationName;
    $(`#${ID_SELECTOR.STATION_MODAL_FORM_INPUT}`).dataset.id = stationId;
  }

  #onRevisionSubmit = async event => {
    event.preventDefault();

    const $input = event.target[ID_SELECTOR.STATION_MODAL_FORM_INPUT];
    const revisionName = $input.value;
    const originalName = $(`#${ID_SELECTOR.MODAL}`).dataset.stationName;

    if (revisionName === originalName) {
      alert(ALERT_MESSAGE.STATION_NAME_REVISION_FAIL);
      return;
    }

    const stationId = $input.dataset.id;
    const bodyData = {
      name: revisionName,
    };
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    try {
      await fetchStationNameRevision({ accessToken, bodyData, stationId });
      alert(ALERT_MESSAGE.STATION_NAME_REVISION_SUCCESS);
      closeModal();
      loadStationList(this.props.stationsState, accessToken);
    } catch (err) {
      alert(err.message);
      return;
    }
  };
}

export default StationModal;
