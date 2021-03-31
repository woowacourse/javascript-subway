import { ID_SELECTOR } from '../constants';
import SECTION_TEMPLATE from '../templates/sectionTemplate';
import $ from '../utils/querySelector';
import Component from './Component';

class SectionComponent extends Component {
  constructor(props) {
    super(props);
  }

  initLoad() {
    // TODO: render prefix 고민해보기
    this.#renderSelectOption();
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
}

export default SectionComponent;
