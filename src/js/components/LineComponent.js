import { CLASS_SELECTOR, ID_SELECTOR, REQUEST_URL } from '../constants.js';
import LINE_TEMPLATE from '../templates/lineTemplate.js';
import { closeModal, openModal } from '../utils/DOM.js';
import $ from '../utils/querySelector.js';
import Component from './Component.js';
import { fetchLineCreation } from '../utils/fetch.js';

class LineComponent extends Component {
  constructor(props) {
    super(props);
  }

  initStateListener() {
    this.props.linesState.setListener(this.renderLineList);
  }

  initLoad() {
    this.#loadSelectOption(`#${ID_SELECTOR.LINE_MODAL_FORM_UP_STATION}`);
    this.#loadSelectOption(`#${ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION}`);
    this.renderLineList(this.props.linesState.Data);
  }

  initEvent() {
    $(`#${ID_SELECTOR.LINE_CREATION_BUTTON}`).addEventListener(
      'click',
      openModal
    );

    $(`.${CLASS_SELECTOR.MODAL_CLOSE}`).addEventListener('click', closeModal);

    $(`#${ID_SELECTOR.LINE_MODAL_FORM}`).addEventListener(
      'submit',
      this.#onLineCreated
    );

    $(`.${CLASS_SELECTOR.LINE_COLOR_SELECTOR}`).addEventListener(
      'click',
      ({ target }) => {
        if (
          !target.classList.contains(CLASS_SELECTOR.LINE_COLOR_SELECTOR_OPTION)
        ) {
          return;
        }

        $(`#${ID_SELECTOR.LINE_MODAL_FORM_COLOR}`).value = target.dataset.color;
      }
    );
  }

  #onLineCreated = async event => {
    event.preventDefault();

    const lineName = event.target[ID_SELECTOR.LINE_MODAL_FORM_NAME].value;
    const upStationId =
      event.target[ID_SELECTOR.LINE_MODAL_FORM_UP_STATION].value;
    const downStationId =
      event.target[ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION].value;
    const distance = event.target[ID_SELECTOR.LINE_MODAL_FORM_DISTANCE].value;
    const duration = event.target[ID_SELECTOR.LINE_MODAL_FORM_DURATION].value;
    const color = event.target[ID_SELECTOR.LINE_MODAL_FORM_COLOR].value;

    const url = REQUEST_URL + '/lines';
    const data = {
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
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
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

  #loadSelectOption(selector) {
    $(selector).innerHTML = this.props.stationsState.Data.map(
      ({ id, name }) => `<option value="${id}">${name}</option>`
    ).join('');
  }

  #clearModalInput() {
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_NAME}`).value = '';
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_DISTANCE}`).value = '';
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_DURATION}`).value = '';
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_COLOR}`).value = '';
  }

  #makeLineTemplate({ name, color }) {
    return `
    <li class="d-flex items-center py-2 relative">
      <span class="subway-line-color-dot bg-${color}"></span>
      <span class="w-100 pl-6 subway-line-list-item-name"
        >${name}</span
      >
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>
    <hr class="my-0" />`;
  }

  renderLineList = lines => {
    const template = lines.map(this.#makeLineTemplate).join('');

    $(`#${ID_SELECTOR.LINE_LIST}`).innerHTML = template;
  };

  render() {
    super.render(LINE_TEMPLATE);
  }
}

export default LineComponent;
