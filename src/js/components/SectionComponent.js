import { ID_SELECTOR, KEYWORD, REQUEST_URL } from '../constants';
import SECTION_TEMPLATE from '../templates/sectionTemplate';
import $ from '../utils/querySelector';
import Component from './Component';
import { fetchLineRead } from '../utils/fetch.js';
import SectionModal from '../modals/SectionModal';

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
    // TODO: render prefix 고민해보기
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
      () => {
        this.sectionModal.route(KEYWORD.CREATION);
      }
    );
  }

  render() {
    super.render(SECTION_TEMPLATE);
  }

  #renderSelectOption() {
    const lines = this.props.linesState.Data;

    $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).innerHTML = lines
      .map(this.#createOptionTemplate)
      .join('');
  }

  #createOptionTemplate(line) {
    return `<option value="${line.id}">${line.name}</option>`;
  }

  renderSectionList = async lineId => {
    const url = REQUEST_URL + `/lines/${lineId}`;
    const accessToken = this.props.accessTokenState.Data;

    try {
      const response = await fetchLineRead(url, accessToken);
      const stations = [];
      const { sections } = await response.json();
      const { upStation, downStation } = sections.shift();

      stations.push(upStation, downStation);
      sections.forEach(({ downStation }) => stations.push(downStation));

      $(`#${ID_SELECTOR.SECTION_LIST}`).innerHTML = stations
        .map(this.#createStationTemplate)
        .join('');
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  #createStationTemplate(station) {
    return `
    <li class="d-flex items-center py-2 relative">
      <span class="w-100 pl-6">${station.name}</span>
      <button
        data-id=${station.id}
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1"
      >
        수정
      </button>
      <button
        data-id=${station.id}
        type="button"
        class="bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>
    <hr class="my-0" />`;
  }
}

export default SectionComponent;
