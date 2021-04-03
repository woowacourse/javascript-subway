import Component from './Component.js';
import STATION_TEMPLATE from '../templates/stationTemplate.js';
import $ from '../utils/querySelector.js';
import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  KEYWORD,
  REQUEST_URL,
} from '../constants.js';
import { fetchStationCreation, fetchStationRemoval } from '../utils/fetch.js';
import { loadStationList } from '../utils/loadByAJAX.js';
import StationModal from '../modals/StationModal.js';
import { hasClassName } from '../utils/validation.js';

class StationComponent extends Component {
  stationModal;

  constructor(props) {
    super(props);

    this.stationModal = new StationModal({
      accessTokenState: this.props.accessTokenState,
      stationsState: this.props.stationsState,
    });
  }

  initStateListener() {
    this.props.stationsState.setListener(this.renderStationList);
  }

  initLoad() {
    this.renderStationList(this.props.stationsState.Data);
  }

  initEvent() {
    $(`#${ID_SELECTOR.STATION_FORM}`).addEventListener(
      'submit',
      this.#onStationCreated
    );

    $(`#${ID_SELECTOR.STATION_LIST}`).addEventListener(
      'click',
      this.#onStationRevised
    );

    $(`#${ID_SELECTOR.STATION_LIST}`).addEventListener(
      'click',
      this.#onStationRemoved
    );
  }

  render() {
    super.render(STATION_TEMPLATE);
  }

  renderStationList = stations => {
    const template = stations
      .map(STATION_TEMPLATE.makeStationTemplate)
      .join('');

    $(`#${ID_SELECTOR.STATION_LIST}`).innerHTML = template;
  };

  #onStationRevised = ({ target }) => {
    if (!hasClassName(target, CLASS_SELECTOR.STATION_LIST_ITEM_REVISION)) {
      return;
    }

    $(`#${ID_SELECTOR.MODAL}`).dataset.stationId = target.dataset.id;
    $(`#${ID_SELECTOR.MODAL}`).dataset.stationName = target.dataset.name;
    this.stationModal.route(KEYWORD.REVISION);
  };

  #onStationRemoved = ({ target }) => {
    if (!hasClassName(target, CLASS_SELECTOR.STATION_LIST_ITEM_REMOVAL)) {
      return;
    }

    if (!confirm(CONFIRM_MESSAGE.STATION_REMOVAL)) {
      return;
    }

    this.#removeStation(target.dataset.id);
  };

  #onStationCreated = async event => {
    event.preventDefault();

    const $input = event.target[ID_SELECTOR.STATION_FORM_NAME];
    const inputName = $input.value;
    const bodyData = { name: inputName };
    const accessToken = this.props.accessTokenState.Data;

    // TODO: try - catch 부분 loadByAJAX로 추출하기
    try {
      const response = await fetchStationCreation(bodyData, accessToken);

      alert(ALERT_MESSAGE.STATION_CREATION_SUCCESS);

      const { id, name } = await response.json();

      this.props.stationsState.pushData({ id, name });
      $input.value = '';
    } catch (err) {
      alert(err.message);
      $input.value = '';
      return;
    }
  };

  #removeStation = async stationId => {
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchStationRemoval(stationId, accessToken);

      alert(ALERT_MESSAGE.STATION_REMOVAL_SUCCESS);

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

export default StationComponent;
