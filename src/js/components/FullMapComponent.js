import { ID_SELECTOR } from '../constants.js';
import FULL_MAP_TEMPLATE from '../templates/FullMapTemplate.js';
import { fetchLineListRead } from '../utils/fetch.js';
import $ from '../utils/querySelector.js';
import Component from './Component.js';

class FullMapComponent extends Component {
  constructor(props) {
    super(props);
  }

  initLoad() {
    this.#loadFullMap();
  }

  render() {
    super.render(FULL_MAP_TEMPLATE);
  }

  #loadFullMap = async () => {
    try {
      const response = await fetchLineListRead(
        this.props.accessTokenState.Data
      );
      const lines = await response.json();
      const linesTemplate = lines
        .map(line =>
          FULL_MAP_TEMPLATE.makeLineTemplate(line.name, line.stations)
        )
        .join('');

      console.log(lines);

      $(`#${ID_SELECTOR.FULL_MAP_LINE_LIST}`).innerHTML = linesTemplate;
    } catch (error) {
      alert(error.message);
    }
  };
}

export default FullMapComponent;
