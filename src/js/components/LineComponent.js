import { CLASS_SELECTOR, ID_SELECTOR } from '../constants.js';
import LINE_TEMPLATE from '../templates/lineTemplate.js';
import $ from '../utils/querySelector.js';
import Component from './Component.js';
import LineModalComponent from './LineModalComponent.js';
class LineComponent extends Component {
  modalComponent;

  constructor(props) {
    super(props);

    this.modalComponent = new LineModalComponent({
      accessTokenState: this.props.accessTokenState,
      stationsState: this.props.stationsState,
      linesState: this.props.linesState,
    });
    this.modalComponent.initialize();
  }

  initStateListener() {
    this.props.linesState.setListener(this.renderLineList);
  }

  initLoad() {
    this.renderLineList(this.props.linesState.Data);
  }

  initEvent() {
    $(`#${ID_SELECTOR.LINE_CREATION_BUTTON}`).addEventListener(
      'click',
      this.modalComponent.onCreationModalOpened
    );

    $(`#${ID_SELECTOR.LINE_LIST}`).addEventListener('click', ({ target }) => {
      if (target.classList.contains(CLASS_SELECTOR.LINE_LIST_ITEM_REVISION)) {
        this.modalComponent.openRevisionModal(target);
        return;
      }
    });

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

  #makeLineTemplate({ name, color, id }) {
    return `
    <li class="d-flex items-center py-2 relative">
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
}

export default LineComponent;
