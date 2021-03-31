import Component from '../components/Component';
import { ALERT_MESSAGE, ID_SELECTOR, KEYWORD, REQUEST_URL } from '../constants';
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
        accessTokenState: this.props.accessTokenState,
        stationsState: this.props.stationsState,
      }),
    };
  }
}

class StationRevisionComponent extends Component {
  constructor(props) {
    super(props);
  }

  initEvent() {
    $(`#${ID_SELECTOR.STATION_MODAL_FORM}`).addEventListener(
      'submit',
      this.#onRevisionSubmit
    );
  }

  render() {
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = STATION_TEMPLATE.MODAL;
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
      // TODO: fetchStationNameRevision 이름 변경하기
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

export default StationModal;
