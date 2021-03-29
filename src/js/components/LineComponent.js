import { CLASS_SELECTOR, ID_SELECTOR, KEYWORD } from '../constants.js';
import LINE_TEMPLATE from '../templates/lineTemplate.js';
import { openModal } from '../utils/DOM.js';
import $ from '../utils/querySelector.js';
import Component from './Component.js';
import { ModalComponent } from './ModalComponent.js';

class LineComponent extends Component {
  modalComponent;

  constructor(props) {
    super(props);

    this.modalComponent = new ModalComponent({
      accessTokenState: this.props.accessTokenState,
      linesState: this.props.linesState,
    });
    this.modalComponent.initialize();
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
      this.#onCreationModalOpened
    );

    $(`#${ID_SELECTOR.LINE_LIST}`).addEventListener('click', ({ target }) => {
      if (target.classList.contains(CLASS_SELECTOR.LINE_LIST_ITEM_REVISION)) {
        this.#openRevisionModal(target);
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

  #findLineBy(targetId) {
    const lines = this.props.linesState.Data;

    return lines.find(line => line.id === Number(targetId));
  }

  #onCreationModalOpened = () => {
    this.modalComponent.modalState.Data = KEYWORD.CREATION;

    openModal();
  };

  #openRevisionModal(target) {
    const lineId = target.dataset.id;

    if (!lineId) {
      console.err('button의 dataset 속성으로 lineId가 존재하지 않습니다.');
    }

    $(`#${ID_SELECTOR.MODAL}`).dataset.id = lineId;
    this.modalComponent.modalState.Data = KEYWORD.REVISION;

    const line = this.#findLineBy(lineId);

    $(`#${ID_SELECTOR.LINE_MODAL_FORM_NAME}`).value = line.name;
    $(`#${ID_SELECTOR.LINE_MODAL_FORM_COLOR}`).value = line.color;

    openModal();
  }

  #loadSelectOption(selector) {
    $(selector).innerHTML = this.props.stationsState.Data.map(
      ({ id, name }) => `<option value="${id}">${name}</option>`
    ).join('');
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

  renderLineList = lines => {
    const template = lines.map(this.#makeLineTemplate).join('');

    $(`#${ID_SELECTOR.LINE_LIST}`).innerHTML = template;
  };

  render() {
    super.render(LINE_TEMPLATE);
  }
}

export default LineComponent;
