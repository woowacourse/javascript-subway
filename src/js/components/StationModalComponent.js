import { ALERT_MESSAGE, ID_SELECTOR, REQUEST_URL } from '../constants';
import STATION_TEMPLATE from '../templates/stationTemplate';
import { openModal, closeModal } from '../utils/DOM';
import { fetchStationNameRevision } from '../utils/fetch';
import { loadStationList } from '../utils/loadByAJAX';
import $ from '../utils/querySelector';
import Component from './Component';

class StationModalComponent extends Component {
  modalState;

  constructor(props) {
    super(props);
  }

  initLoad() {
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = STATION_TEMPLATE.MODAL;
  }

  initEvent() {
    //TODO : dimmed 부분을 누르면 모달창 닫히게
    $(`#${ID_SELECTOR.STATION_MODAL_FORM}`).addEventListener(
      'submit',
      this.#onRevisionSubmit
    );
  }

  renderStationModal(target) {
    const stationId = target.dataset.id;
    const stationName = target.dataset.name;

    $(`#${ID_SELECTOR.STATION_MODAL_FORM_INPUT}`).value = stationName;
    $(`#${ID_SELECTOR.STATION_MODAL_FORM_INPUT}`).dataset.id = stationId;
    openModal();
  }

  #onRevisionSubmit = async event => {
    event.preventDefault();

    const $input = event.target[ID_SELECTOR.STATION_MODAL_FORM_INPUT];
    const revisionName = $input.value;
    const revisionId = $input.dataset.id;
    const url = REQUEST_URL + `/stations/${revisionId}`;
    const bodyData = {
      name: revisionName,
    };
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchStationNameRevision(url, { bodyData, accessToken });
      alert(ALERT_MESSAGE.STATION_NAME_REVISION_SUCCESS);
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

export default StationModalComponent;
