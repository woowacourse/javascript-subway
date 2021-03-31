import { ID_SELECTOR, REQUEST_URL } from '../constants';
import SECTION_TEMPLATE from '../templates/sectionTemplate';
import $ from '../utils/querySelector';
import Component from './Component';
import { fetchLineRead } from '../utils/fetch.js';

class SectionComponent extends Component {
  constructor(props) {
    super(props);
  }

  initLoad() {
    // TODO: render prefix 고민해보기
    this.#renderSelectOption();
  }

  initEvent() {
    $(`#${ID_SELECTOR.SECTION_FORM_SELECT}`).addEventListener(
      'change',
      this.#onSectionListRendered
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

  #onSectionListRendered = async event => {
    const lineId = event.target.value;
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
