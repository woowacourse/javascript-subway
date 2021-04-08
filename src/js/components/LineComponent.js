import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  KEYWORD,
  REQUEST_URL,
} from '../constants.js';
import LineModal from '../modals/LineModal.js';
import {
  LINE_TEMPLATE,
  LINE_CREATING_LINE_TEMPLATE,
} from '../templates/lineTemplate.js';
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
        $(`#${ID_SELECTOR.MODAL}`).dataset.lineId = target.dataset.id;
        this.lineModal.route(KEYWORD.REVISION);

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

  render() {
    super.render(LINE_TEMPLATE);
  }

  renderLineList = lines => {
    const template = lines.map(LINE_CREATING_LINE_TEMPLATE).join('');

    $(`#${ID_SELECTOR.LINE_LIST}`).innerHTML = template;
  };

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
