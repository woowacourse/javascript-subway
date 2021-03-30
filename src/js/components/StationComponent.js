import Component from './Component.js';
import STATION_TEMPLATE from '../templates/stationTemplate.js';
import $ from '../utils/querySelector.js';
import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  REQUEST_URL,
} from '../constants.js';
import { fetchStationCreation, fetchStationRemoval } from '../utils/fetch.js';
import { loadStationList } from '../utils/loadByAJAX.js';
import StationModalComponent from './StationModalComponent.js';

class StationComponent extends Component {
  stationModalComponent;

  constructor(props) {
    super(props);

    this.stationModalComponent = new StationModalComponent({
      accessTokenState: this.props.accessTokenState,
      stationsState: this.props.stationsState,
    });
    this.stationModalComponent.initialize();
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
          target.classList.contains(CLASS_SELECTOR.STATION_LIST_ITEM_REVISION)
        ) {
          this.stationModalComponent.renderStationModal(target);
          return;
        }

        if (
          target.classList.contains(CLASS_SELECTOR.STATION_LIST_ITEM_REMOVAL)
        ) {
          if (!confirm(CONFIRM_MESSAGE.STATION_REMOVAL)) {
            return;
          }

          this.#removeStation(target.dataset.id);
          return;
        }
      }
    );
  }

  initStateListener() {
    this.props.stationsState.setListener(this.renderStationList);
  }

  initLoad() {
    // TODO: 03-27 해야할 곳, 너무 긴 인자들을 정리해야함
    this.renderStationList(this.props.stationsState.Data);
  }

  renderStationList = stations => {
    const template = stations.map(this.#makeStationTemplate).join('');

    $(`#${ID_SELECTOR.STATION_LIST}`).innerHTML = template;
  };

  #removeStation = async id => {
    const url = REQUEST_URL + `/stations/${id}`;
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchStationRemoval(url, accessToken);

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
    const url = REQUEST_URL + '/stations';
    const bodyData = { name: inputName };
    const accessToken = this.props.accessTokenState.Data;

    // TODO: try - catch 부분 loadByAJAX로 추출하기
    try {
      const response = await fetchStationCreation(url, {
        bodyData,
        accessToken,
      });

      //TODO:스낵바로 확인
      alert('역 추가 완료');

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

  render() {
    super.render(STATION_TEMPLATE);
  }
}

export default StationComponent;
