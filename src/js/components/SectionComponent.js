import {
  CLASS_SELECTOR,
  CONFIRM_MESSAGE,
  ID_SELECTOR,
  KEYWORD,
  REQUEST_URL,
  ALERT_MESSAGE,
  MODAL_TYPE,
} from '../constants';
import { SECTION_TEMPLATE } from '../templates/sectionTemplate';
import $ from '../utils/querySelector';
import Component from './Component';
import { fetchLineRead, fetchSectionRemoval } from '../utils/fetch.js';
import SectionModal from '../modals/SectionModal';
import { closeModal } from '../utils/DOM';

class SectionComponent extends Component {
  sectionModal;

  constructor(props) {
    super(props);

    this.sectionModal = new SectionModal({
      accessTokenState: this.props.accessTokenState,
      linesState: this.props.linesState,
      stationsState: this.props.stationsState,
      renderSectionList: this.renderSectionList,
    });
  }

  initLoad() {
    this.#loadSelectOption();
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
      () => {
        if ($(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).value === KEYWORD.NONE) {
          alert(ALERT_MESSAGE.NOT_SELECTED_LINE);

          return;
        }

        this.sectionModal.route(MODAL_TYPE.CREATION);
      }
    );

    $(`#${ID_SELECTOR.SECTION_LIST}`).addEventListener('click', event => {
      if (
        event.target.classList.contains(
          CLASS_SELECTOR.SECTION_LIST_ITEM_REMOVAL
        )
      ) {
        if (!confirm(CONFIRM_MESSAGE.SECTION_REMOVAL)) {
          return;
        }
        const stationId = event.target.dataset.id;
        const lineId = $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).value;

        this.#removeSection(stationId, lineId);
      }
    });
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

    const url = REQUEST_URL + `/lines/${lineId}`;
    const accessToken = this.props.accessTokenState.Data;

    try {
      const response = await fetchLineRead(url, accessToken);
      const { color, stations } = await response.json();

      $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).className = `bg-${color}`;
      $(`#${ID_SELECTOR.SECTION_LIST}`).innerHTML = stations
        .map(SECTION_TEMPLATE.CREATING_STATION)
        .join('');
      closeModal();
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  #removeSection = async (stationId, lineId) => {
    const url =
      REQUEST_URL + `/lines/${lineId}/sections?stationId=${stationId}`;
    const accessToken = this.props.accessTokenState.Data;

    try {
      await fetchSectionRemoval(url, accessToken);

      alert(ALERT_MESSAGE.SECTION_REMOVAL_SUCCESS);

      this.renderSectionList(lineId);
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  #loadSelectOption() {
    const lines = this.props.linesState.Data;
    const initialTemplate = `<option selected value="${KEYWORD.NONE}">노선을 선택해주세요</option>`;

    $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).innerHTML =
      initialTemplate + lines.map(SECTION_TEMPLATE.CREATING_OPTION).join('');
  }
}

export default SectionComponent;
