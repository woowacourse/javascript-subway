import Component from '../components/Component';
import { ALERT_MESSAGE, ID_SELECTOR, KEYWORD, REQUEST_URL } from '../constants';
import LINE_TEMPLATE from '../templates/lineTemplate';
import { closeModal } from '../utils/DOM';
import { fetchLineCreation, fetchLineRevision } from '../utils/fetch';
import { loadLineList } from '../utils/loadByAJAX';
import $ from '../utils/querySelector';
import { createOptionTemplate } from '../utils/template';
import Modal from './Modal';

class LineModal extends Modal {
  constructor(props) {
    super(props);

    this._router = {
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

  render() {
    $(`#${ID_SELECTOR.MODAL}`).innerHTML =
      LINE_TEMPLATE.DEFAULT_MODAL_COMPONENT;

    this.#loadSelectOption(`#${ID_SELECTOR.LINE_MODAL_FORM_UP_STATION}`);
    this.#loadSelectOption(`#${ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION}`);
  }

  #loadSelectOption(selector) {
    $(selector).innerHTML = this.props.stationsState.Data.map(({ id, name }) =>
      createOptionTemplate(id, name)
    ).join('');
  }

  #createLine = async event => {
    const lineName = event.target[ID_SELECTOR.LINE_MODAL_FORM_NAME].value;
    const upStationId =
      event.target[ID_SELECTOR.LINE_MODAL_FORM_UP_STATION].value;
    const downStationId =
      event.target[ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION].value;

    if (upStationId === downStationId) {
      alert(ALERT_MESSAGE.STATIONS_SETTING_OF_LINE_FAIL);
      return;
    }

    const distance = event.target[ID_SELECTOR.LINE_MODAL_FORM_DISTANCE].value;
    const duration = event.target[ID_SELECTOR.LINE_MODAL_FORM_DURATION].value;
    const color = event.target[ID_SELECTOR.LINE_MODAL_FORM_COLOR].value;
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
      const response = await fetchLineCreation(bodyData, accessToken);

      alert(ALERT_MESSAGE.LINE_CREATION_SUCCESS);

      const { id, name, color } = await response.json();

      this.props.linesState.pushData({ id, name, color });
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

  initLoad() {
    this.#loadRevisionModal();
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

  #loadRevisionModal() {
    const lineId = $(`#${ID_SELECTOR.MODAL}`).dataset.lineId;

    if (!lineId) {
      console.error(
        `#${ID_SELECTOR.MODAL}l의 dataset 속성으로 lineId가 존재하지 않습니다.`
      );
      return;
    }

    const line = this.#findLineBy(lineId);

    $(`#${ID_SELECTOR.LINE_MODAL_FORM_NAME}`).value = line.name;
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_COLOR}`).value = line.color;
  }

  #findLineBy(targetId) {
    const lines = this.props.linesState.Data;

    return lines.find(line => line.id === Number(targetId));
  }

  #revisionLine = async event => {
    const lineId = $(`.${ID_SELECTOR.MODAL}`).dataset.lineId;
    const lineName = event.target[ID_SELECTOR.LINE_MODAL_FORM_NAME].value;
    const color = event.target[ID_SELECTOR.LINE_MODAL_FORM_COLOR].value;
    const bodyData = {
      name: lineName,
      color,
    };
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchLineRevision({ accessToken, bodyData, lineId });

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
