import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import { mainTemplate, subwayMapLine } from './template/main.js';

class Map extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
  }

  renderSelf() {
    const subwayState = this.stateManagers.subwayState.getSubwayState();
    this.parentNode.innerHTML = mainTemplate(subwayState);
  }

  addEventListeners() {
    $('.js-map-form__select').addEventListener('change', ({ target }) => {
      const lineId = target.value;
      const { lines } = this.stateManagers.subwayState.getSubwayState();
      const selectedLine = lines.find((line) => line.id === Number(lineId));

      $('.js-map-line-container').innerHTML = subwayMapLine(selectedLine);

      $('.js-map-form__select').classList.add('text-white');
      $('.js-map-form__select').setAttribute(
        'data-bg-color',
        selectedLine.color
      );
    });
  }
}

export default Map;
