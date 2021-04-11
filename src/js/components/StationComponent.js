import Component from './Component.js';
import { STATION_TEMPLATE } from '../templates/stationTemplate.js';
import $ from '../utils/querySelector.js';
import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  MODAL_TYPE,
  REQUEST_URL,
} from '../constants.js';
import { fetchStationCreation, fetchStationDeletion } from '../utils/fetch.js';
import { loadStationList } from '../utils/loadByAJAX.js';
import StationModal from '../modals/StationModal.js';

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
    // TODO: render로 해야하는지 load로 해야하는지 고민
    this.renderStationList(this.props.stationsState.Data);
  }

  initEvent() {
    $(`#${ID_SELECTOR.STATION_FORM}`).addEventListener(
      'submit',
      this.#onStationCreated
    );

    //TODO: if문 내부 리펙토링 하기
    $(`#${ID_SELECTOR.STATION_LIST}`).addEventListener(
      'click',
      ({ target }) => {
        if (
          target.classList.contains(CLASS_SELECTOR.STATION_LIST_ITEM_UPDATE)
        ) {
          $(`#${ID_SELECTOR.MODAL}`).dataset.stationId = target.dataset.id;
          $(`#${ID_SELECTOR.MODAL}`).dataset.stationName = target.dataset.name;
          this.stationModal.route(MODAL_TYPE.UPDATE);

          return;
        }

        if (
          target.classList.contains(CLASS_SELECTOR.STATION_LIST_ITEM_DELETION)
        ) {
          if (!confirm(CONFIRM_MESSAGE.STATION_DELETION)) {
            return;
          }

          this.#removeStation(target.dataset.id);
          return;
        }
      }
    );
  }

  render() {
    super.render(STATION_TEMPLATE);
  }

  renderStationList = stations => {
    const template = stations.map(STATION_TEMPLATE.CREATING_STATION).join('');

    $(`#${ID_SELECTOR.STATION_LIST}`).innerHTML = template;
  };

  #removeStation = async id => {
    const url = REQUEST_URL + `/stations/${id}`;
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchStationDeletion(url, accessToken);

      alert(ALERT_MESSAGE.STATION_DELETION_SUCCESS);

      loadStationList(
        this.props.stationsState,
        this.props.accessTokenState.Data
      );
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  #onStationCreated = async event => {
    event.preventDefault();

    const $input = event.target[ID_SELECTOR.STATION_FORM_NAME];
    const inputName = $input.value;
    const url = REQUEST_URL + '/stations';
    const bodyData = { name: inputName };
    const accessToken = this.props.accessTokenState.Data;

    // TODO: try - catch 부분 loadByAJAX로 추출하기
    try {
      const response = await fetchStationCreation(url, {
        bodyData,
        accessToken,
      });

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
}

export default StationComponent;
