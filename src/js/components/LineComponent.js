import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  KEYWORD,
  REQUEST_URL,
} from '../constants.js';
import LineModal from '../modals/LineModal.js';
import LINE_TEMPLATE from '../templates/lineTemplate.js';
import $ from '../utils/querySelector.js';
import Component from './Component.js';
import { fetchLineRemoval } from '../utils/fetch.js';
import { loadLineList } from '../utils/loadByAJAX.js';

class LineComponent extends Component {
  lineModal;

  constructor(props) {
    super(props);

    this.lineModal = new LineModal({
      accessTokenState: this.props.accessTokenState,
      stationsState: this.props.stationsState,
      linesState: this.props.linesState,
    });
  }

  initStateListener() {
    this.props.linesState.setListener(this.renderLineList);
  }

  initLoad() {
    this.renderLineList(this.props.linesState.Data);
  }

  initEvent() {
    $(`#${ID_SELECTOR.LINE_CREATION_BUTTON}`).addEventListener('click', () => {
      this.lineModal.route(KEYWORD.CREATION);
    });

    $(`#${ID_SELECTOR.LINE_LIST}`).addEventListener('click', ({ target }) => {
      if (target.classList.contains(CLASS_SELECTOR.LINE_LIST_ITEM_REVISION)) {
        this.lineModal.route(KEYWORD.REVISION);
        // TODO: loadRevisionModal을 LineRevisionComponent 안에 넣어야 할지 고민
        this.#loadRevisionModal(target);

        return;
      }

      if (target.classList.contains(CLASS_SELECTOR.LINE_LIST_ITEM_REMOVAL)) {
        if (!confirm(CONFIRM_MESSAGE.LINE_REMOVAL)) {
          return;
        }

        this.#removeLine(target.dataset.id);
      }
    });

    //TODO: 콜백함수 네이밍해주기
    $(`#${ID_SELECTOR.MODAL}`).addEventListener('click', ({ target }) => {
      if (
        !target.classList.contains(CLASS_SELECTOR.LINE_COLOR_SELECTOR_OPTION)
      ) {
        return;
      }

      $(`#${ID_SELECTOR.LINE_MODAL_FORM_COLOR}`).value = target.dataset.color;
    });
  }

  renderLineList = lines => {
    const template = lines.map(this.#makeLineTemplate).join('');

    $(`#${ID_SELECTOR.LINE_LIST}`).innerHTML = template;
  };

  render() {
    super.render(LINE_TEMPLATE);
  }

  #loadRevisionModal = button => {
    const lineId = button.dataset.id;

    if (!lineId) {
      console.err('button의 dataset 속성으로 lineId가 존재하지 않습니다.');
      return;
    }

    $(`#${ID_SELECTOR.MODAL}`).dataset.id = lineId;

    const line = this.#findLineBy(lineId);

    $(`#${ID_SELECTOR.LINE_MODAL_FORM_NAME}`).value = line.name;
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_COLOR}`).value = line.color;
  };

  #findLineBy(targetId) {
    const lines = this.props.linesState.Data;

    return lines.find(line => line.id === Number(targetId));
  }

  #makeLineTemplate({ name, color, id }) {
    return `
    <li class="${CLASS_SELECTOR.LINE_LIST_ITEM} d-flex items-center py-2 relative">
      <span class="subway-line-color-dot bg-${color}"></span>
      <span class="w-100 pl-6 subway-line-list-item-name"
        >${name}</span
      >
      <button
        type="button"
        data-id="${id}"
        class="${CLASS_SELECTOR.LINE_LIST_ITEM_REVISION} bg-gray-50 text-gray-500 text-sm mr-1"
      >
        수정
      </button>
      <button
        type="button"
        data-id="${id}"
        class="${CLASS_SELECTOR.LINE_LIST_ITEM_REMOVAL}"
        class="bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>
    <hr class="my-0" />`;
  }

  #removeLine = async id => {
    const url = REQUEST_URL + `/lines/${id}`;
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchLineRemoval(url, accessToken);

      alert(ALERT_MESSAGE.LINE_REMOVAL_SUCCESS);

      loadLineList(this.props.linesState, accessToken);
    } catch (err) {
      alert(err.message);
      return;
    }
  };
}

export default LineComponent;
