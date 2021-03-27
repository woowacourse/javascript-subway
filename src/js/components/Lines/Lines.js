import Component from '../../core/Component.js';
import { linesTemplate } from './template.js';
import { $ } from '../../utils/index.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';

export default class Lines extends Component {
  constructor() {
    super();
  }

  bindEvent() {
    $('#line-create-button').addEventListener('click', this.handleLineCreateModalOpen);

    $('.subway-line-color-selector').addEventListener('click', this.handleLineColorSelector);

    $('#line-create-form').addEventListener('submit', this.handleLineCreateForm);
  }

  handleLineCreateModalOpen() {
    $('#line-create-modal').classList.add('open');
    $('#line-name-input').focus();
  }

  handleLineColorSelector({ target }) {
    if (!target.classList.contains('color-option')) {
      return;
    }

    const style = getComputedStyle(target);
    const backgroundColor = style.backgroundColor;
    const $lineColorInput = $('#line-color-input');

    $lineColorInput.style.backgroundColor = backgroundColor;
    $lineColorInput.placeholder = '';
  }

  handleLineCreateForm(e) {
    e.preventDefault();

    const lineName = e.target.elements['line-name-input'].value;
    const departureStation = e.target.elements['departure-station-select'].value;
    const arrivalStation = e.target.elements['arrival-station-select'].value;
    const distance = e.target.elements['distance-input'].value;
    const duration = e.target.elements['duration-input'].value;
    const lineColor = e.target.elements['line-color-input'].style.backgroundColor;
  }

  render(token) {
    $('main').innerHTML = token ? linesTemplate() : LOGIN_REQUIRED_TEMPLATE;
  }

  load(token = '') {
    this.render(token);
    this.bindEvent();
  }
}
