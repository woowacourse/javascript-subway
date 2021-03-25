import Component from './Component.js';
import STATION_TEMPLATE from '../templates/stationTemplate.js';
import $ from '../utils/querySelector.js';
import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  REQUEST_URL,
  STATE_KEY,
} from '../constants.js';
import {
  fetchStationList,
  fetchStationNameRevision,
  fetchStationRemoval,
} from '../utils/fetch.js';
import State from './State.js';
import { closeModal, openModal } from '../utils/DOM.js';

class StationComponent extends Component {
  constructor(props) {
    super(props);
  }

  initLoad() {
    this.#loadStationList();
  }

  initState() {
    this.state = new State({
      [STATE_KEY.STATION]: [],
    });

    this.state.setListener(STATE_KEY.STATION, this.handleStationListToUpdate);
  }

  // TODO: 메서드 선언 순서 고민해보기
  initEvent() {
    $(`#${ID_SELECTOR.STATION_FORM}`).addEventListener(
      'submit',
      this.#onStationSubmit
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
  #removeStation = async id => {
    const url = REQUEST_URL + `/stations/${id}`;
    const accessToken = this.props.appState.getData(STATE_KEY.ACCESS_TOKEN);

    try {
      await fetchStationRemoval(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert(ALERT_MESSAGE.STATION_REMOVAL_SUCCESS);
      this.#loadStationList();
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
    const data = {
      name: revisionName,
    };
    const accessToken = this.props.appState.getData(STATE_KEY.ACCESS_TOKEN);

    try {
      await fetchStationNameRevision(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      alert(ALERT_MESSAGE.STATION_NAME_REVISION_SUCCESS);
      closeModal();
      this.#loadStationList();
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  handleStationListToUpdate = stations => {
    const template = stations.map(this.#makeStationTemplate).join('');

    $(`#${ID_SELECTOR.STATION_LIST}`).innerHTML = template;
  };

  #onStationSubmit = async event => {
    event.preventDefault();

    const $input = event.target[ID_SELECTOR.STATION_FORM_NAME];
    const inputName = $input.value;
    const url = REQUEST_URL + '/stations';
    const data = { name: inputName };
    const accessToken = this.props.appState.getData(STATE_KEY.ACCESS_TOKEN);

    try {
      const response = await fetchStationList(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      //TODO:스낵바로 확인
      alert('역 추가 완료');

      const { id, name } = await response.json();
      const stations = this.state.getData(STATE_KEY.STATION);

      // TODO: State 클래스에 pushData 만들기
      stations.push({ id, name });
      this.state.setData({ [STATE_KEY.STATION]: stations });
      $input.value = '';
    } catch (err) {
      alert(err.message);
      $input.value = '';
      return;
    }
  };

  async #loadStationList() {
    const url = REQUEST_URL + '/stations';
    const accessToken = this.props.appState.getData(STATE_KEY.ACCESS_TOKEN);

    try {
      const response = await fetchStationList(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const stationResponse = await response.json();
      const stations = stationResponse.map(station => ({
        id: station.id,
        name: station.name,
      }));

      this.state.setData({ [STATE_KEY.STATION]: stations });
    } catch (err) {
      alert(err.message);
      return;
    }
  }

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
