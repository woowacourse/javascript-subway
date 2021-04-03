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
    const template = stations.map(this.#makeStationTemplate).join('');

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
      const stations = this.props.stationsState.Data;

      // TODO: State 클래스에 pushData 만들기
      stations.push({ id, name });
      this.props.stationsState.Data = stations;

      $input.value = '';
    } catch (err) {
      alert(err.message);
      $input.value = '';
      return;
    }
  };

  // TODO: 위치 생각해보기
  #makeStationTemplate({ id, name }) {
    return `
    <li class="${CLASS_SELECTOR.STATION_LIST_ITEM} d-flex items-center py-2">
      <span class="w-100 pl-2">${name}</span>
      <button
        data-name="${name}"
        data-id="${id}"
        type="button"
        class="${CLASS_SELECTOR.STATION_LIST_ITEM_REVISION} bg-gray-50 text-gray-500 text-sm mr-1"
      >
        수정
      </button>
      <button
        type="button"
        data-id="${id}"
        class="${CLASS_SELECTOR.STATION_LIST_ITEM_REMOVAL} bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>
    <hr class="my-0" />
    `;
  }
}

export default StationComponent;
