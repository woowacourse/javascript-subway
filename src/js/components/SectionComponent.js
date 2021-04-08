import {
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  KEYWORD,
  REQUEST_URL,
  ALERT_MESSAGE,
  LOCAL_STORAGE_KEY,
} from '../constants';
import SECTION_TEMPLATE from '../templates/sectionTemplate';
import $ from '../utils/querySelector';
import Component from './Component';
import { fetchLineRead, fetchSectionRemoval } from '../utils/fetch.js';
import SectionModal from '../modals/SectionModal';
import { closeModal } from '../utils/DOM';
import { hasClassName } from '../utils/validation';
import { createOptionTemplate } from '../utils/template';

class SectionComponent extends Component {
  sectionModal;

  constructor(props) {
    super(props);

    this.sectionModal = new SectionModal({
      linesState: this.props.linesState,
      stationsState: this.props.stationsState,
      renderSectionList: this.renderSectionList,
    });
  }

  initLoad() {
    this.#renderSelectOption();
  }

  initEvent() {
    $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).addEventListener(
      'change',
      event => {
        this.renderSectionList(event.target.value);
      }
    );

    $(`#${ID_SELECTOR.SECTION_CREATION_BUTTON}`).addEventListener(
      'click',
      this.#onCreationModalRendered
    );

    $(`#${ID_SELECTOR.SECTION_LIST}`).addEventListener(
      'click',
      this.#onSectionDeleted
    );
  }

  render() {
    super.render(SECTION_TEMPLATE);
  }

  renderSectionList = async lineId => {
    if (lineId === KEYWORD.NONE) {
      $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).className = '';
      $(`#${ID_SELECTOR.SECTION_LIST}`).innerHTML = '';
      return;
    }

    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    try {
      const response = await fetchLineRead(lineId, accessToken);
      const { color, stations } = await response.json();

      $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).className = `bg-${color}`;
      $(`#${ID_SELECTOR.SECTION_LIST}`).innerHTML = stations
        .map(SECTION_TEMPLATE.createStationTemplate)
        .join('');
      closeModal();
    } catch (err) {
      this.props.treatFetchError(error);
      return;
    }
  };

  #onSectionDeleted = event => {
    if (!hasClassName(event.target, CLASS_SELECTOR.SECTION_LIST_ITEM_REMOVAL)) {
      return;
    }

    if (!confirm(CONFIRM_MESSAGE.SECTION_REMOVAL)) {
      return;
    }

    const stationId = event.target.dataset.id;
    const lineId = $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).value;

    this.#removeSection(stationId, lineId);
  };

  #onCreationModalRendered = () => {
    if ($(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).value === KEYWORD.NONE) {
      alert(ALERT_MESSAGE.NOT_SELECTED_LINE);

      return;
    }

    this.sectionModal.route(KEYWORD.CREATION);
  };

  #removeSection = async (stationId, lineId) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    try {
      await fetchSectionRemoval({ accessToken, stationId, lineId });

      alert(ALERT_MESSAGE.SECTION_REMOVAL_SUCCESS);

      this.renderSectionList(lineId);
    } catch (error) {
      this.props.treatFetchError(error);
      return;
    }
  };

  #renderSelectOption() {
    const lines = this.props.linesState.Data;
    const initialTemplate = createOptionTemplate(
      KEYWORD.NONE,
      '노선을 선택해주세요',
      true
    );

    $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).innerHTML =
      initialTemplate +
      lines.map(line => createOptionTemplate(line.id, line.name)).join('');
  }
}

export default SectionComponent;
