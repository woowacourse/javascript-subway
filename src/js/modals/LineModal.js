import Component from '../components/Component';
import { ALERT_MESSAGE, ID_SELECTOR, KEYWORD, REQUEST_URL } from '../constants';
import LINE_TEMPLATE from '../templates/lineTemplate';
import { closeModal } from '../utils/DOM';
import { fetchLineCreation, fetchLineRevision } from '../utils/fetch';
import { loadLineList } from '../utils/loadByAJAX';
import $ from '../utils/querySelector';
import Modal from './Modal';

class LineModal extends Modal {
  constructor(props) {
    super(props);

    this._router = {
      // TODO: constant에서 KEYWORD -> MODAL_TYPE으로 바꾸기
      [KEYWORD.CREATION]: new LineCreationComponent({
        accessTokenState: this.props.accessTokenState,
        stationsState: this.props.stationsState,
        linesState: this.props.linesState,
      }),
      [KEYWORD.REVISION]: new LineRevisionComponent({
        accessTokenState: this.props.accessTokenState,
        linesState: this.props.linesState,
      }),
    };
  }
}

class LineCreationComponent extends Component {
  constructor(props) {
    super(props);
  }

  initEvent() {
    $(`#${ID_SELECTOR.LINE_MODAL_FORM}`).addEventListener('submit', event => {
      event.preventDefault();

      this.#createLine(event);
    });
  }

  // TODO: render와 initEvent를 protected로 바꿀 것인가
  render() {
    $(`#${ID_SELECTOR.MODAL}`).innerHTML = LINE_TEMPLATE.MODAL;

    this.#loadSelectOption(`#${ID_SELECTOR.LINE_MODAL_FORM_UP_STATION}`);
    this.#loadSelectOption(`#${ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION}`);
  }

  #loadSelectOption(selector) {
    $(selector).innerHTML = this.props.stationsState.Data.map(
      ({ id, name }) => `<option value="${id}">${name}</option>`
    ).join('');
  }

  #createLine = async event => {
    const lineName = event.target[ID_SELECTOR.LINE_MODAL_FORM_NAME].value;
    const upStationId =
      event.target[ID_SELECTOR.LINE_MODAL_FORM_UP_STATION].value;
    const downStationId =
      event.target[ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION].value;
    const distance = event.target[ID_SELECTOR.LINE_MODAL_FORM_DISTANCE].value;
    const duration = event.target[ID_SELECTOR.LINE_MODAL_FORM_DURATION].value;
    const color = event.target[ID_SELECTOR.LINE_MODAL_FORM_COLOR].value;

    const url = REQUEST_URL + '/lines';
    const bodyData = {
      name: lineName,
      color,
      upStationId,
      downStationId,
      distance,
      duration,
    };
    const accessToken = this.props.accessTokenState.Data;

    // TODO: try - catch 부분 loadByAJAX로 추출하기
    try {
      const response = await fetchLineCreation(url, {
        bodyData,
        accessToken,
      });

      //TODO:스낵바로 확인
      alert('노선 추가 완료');

      const { id, name, color } = await response.json();
      const lines = this.props.linesState.Data;

      // TODO: State 클래스에 pushData 만들기
      lines.push({ id, name, color });
      this.props.linesState.Data = lines;
      closeModal();
      this.#clearModalInput();
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  #clearModalInput() {
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_NAME}`).value = '';
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_DISTANCE}`).value = '';
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_DURATION}`).value = '';
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_COLOR}`).value = '';
  }
}

class LineRevisionComponent extends Component {
  constructor(props) {
    super(props);
  }

  initEvent() {
    $(`#${ID_SELECTOR.LINE_MODAL_FORM}`).addEventListener('submit', event => {
      event.preventDefault();

      this.#revisionLine(event);
    });
  }
  render() {
    $(`#${ID_SELECTOR.MODAL}`).innerHTML =
      LINE_TEMPLATE.REVISION_MODAL_COMPONENT;
  }

  #revisionLine = async event => {
    const id = $(`.${ID_SELECTOR.MODAL}`).dataset.id;
    const lineName = event.target[ID_SELECTOR.LINE_MODAL_FORM_NAME].value;
    const color = event.target[ID_SELECTOR.LINE_MODAL_FORM_COLOR].value;

    const url = REQUEST_URL + `/lines/${id}`;
    const bodyData = {
      name: lineName,
      color,
    };
    const accessToken = this.props.accessTokenState.Data;

    // TODO: try - catch 부분 loadByAJAX로 추출하기
    try {
      await fetchLineRevision(url, {
        bodyData,
        accessToken,
      });

      //TODO:스낵바로 확인
      alert(ALERT_MESSAGE.LINE_REVISION_SUCCESS);

      loadLineList(this.props.linesState, this.props.accessTokenState.Data);
      closeModal();
    } catch (err) {
      alert(err.message);
      return;
    }
  };
}

export default LineModal;
