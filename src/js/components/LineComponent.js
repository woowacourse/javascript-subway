import {
  ALERT_MESSAGE,
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  MODAL_TYPE,
} from '../constants.js';
import LineModal from '../modals/LineModal.js';
import { LINE_TEMPLATE } from '../templates/lineTemplate.js';
import $ from '../utils/querySelector.js';
import Component from './Component.js';
import { fetchLineDeletion } from '../utils/fetch.js';
import { loadLineList } from '../utils/loadByAJAX.js';
import { hasClassName } from '../utils/validation.js';

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
      this.lineModal.route(MODAL_TYPE.CREATION);
    });

    $(`#${ID_SELECTOR.LINE_LIST}`).addEventListener(
      'click',
      this.#onLineUpdated
    );

    $(`#${ID_SELECTOR.LINE_LIST}`).addEventListener(
      'click',
      this.#onLineDeleted
    );

    $(`#${ID_SELECTOR.MODAL}`).addEventListener(
      'click',
      this.#onLineColorSelected
    );
  }

  render() {
    super.render(LINE_TEMPLATE);
  }

  renderLineList = lines => {
    const template = lines.map(LINE_TEMPLATE.CREATING_LINE).join('');

    $(`#${ID_SELECTOR.LINE_LIST}`).innerHTML = template;
  };

  #deleteLine = async lineId => {
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchLineDeletion(lineId, accessToken);

      alert(ALERT_MESSAGE.LINE_DELETION_SUCCESS);

      loadLineList(this.props.linesState, accessToken);
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  #onLineUpdated = ({ target }) => {
    if (!hasClassName(target, CLASS_SELECTOR.LINE_LIST_ITEM_UPDATE)) {
      return;
    }

    $(`#${ID_SELECTOR.MODAL}`).dataset.lineId = target.dataset.id;
    this.lineModal.route(MODAL_TYPE.UPDATE);
  };

  #onLineDeleted = ({ target }) => {
    if (!hasClassName(target, CLASS_SELECTOR.LINE_LIST_ITEM_DELETION)) {
      return;
    }

    if (!confirm(CONFIRM_MESSAGE.LINE_DELETION)) {
      return;
    }

    this.#deleteLine(target.dataset.id);
  };

  #onLineColorSelected = ({ target }) => {
    if (!hasClassName(target, CLASS_SELECTOR.LINE_COLOR_SELECTOR_OPTIONs)) {
      return;
    }

    $(`#${ID_SELECTOR.LINE_MODAL_FORM_COLOR}`).value = target.dataset.color;
  };
}

export default LineComponent;
