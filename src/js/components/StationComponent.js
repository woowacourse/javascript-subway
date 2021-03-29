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
import {
  fetchStationCreation,
  fetchStationNameRevision,
  fetchStationRemoval,
} from '../utils/fetch.js';
import { closeModal, openModal } from '../utils/DOM.js';
import { loadStationList } from '../utils/loadByAJAX.js';

class StationComponent extends Component {
  constructor(props) {
    super(props);
  }

  initEvent() {
    $(`#${ID_SELECTOR.STATION_FORM}`).addEventListener(
      'submit',
      this.#onStationCreated
    );

    $(`.${CLASS_SELECTOR.MODAL_CLOSE}`).addEventListener('click', closeModal);
    //TODO : dimmed 부분을 누르면 모달창 닫히게
    $(`#${ID_SELECTOR.STATION_MODAL_FORM}`).addEventListener(
      'submit',
      this.#onRevisionSubmit
    );

    //TODO: if문 내부 리펙토링 하기
    $(`#${ID_SELECTOR.STATION_LIST}`).addEventListener(
      'click',
      ({ target }) => {
        if (
          target.classList.contains(CLASS_SELECTOR.STATION_LIST_ITEM_REVISION)
        ) {
          this.#renderStationModal(target);
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

  #renderStationModal(target) {
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

  renderStationList = stations => {
    const template = stations.map(this.#makeStationTemplate).join('');

    $(`#${ID_SELECTOR.STATION_LIST}`).innerHTML = template;
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
