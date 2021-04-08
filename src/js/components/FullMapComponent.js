import { CLASS_SELECTOR, ID_SELECTOR, REQUEST_URL } from '../constants.js';
import FULL_MAP_TEMPLATE from '../templates/fullMapTemplate.js';
import { fetchLineRead } from '../utils/fetch.js';
import $ from '../utils/querySelector.js';
import Component from './Component.js';

REQUEST_URL;

class FullMapComponent extends Component {
  constructor(props) {
    super(props);
  }

  initLoad() {
    this.#getFullMap();
  }

  render() {
    super.render(FULL_MAP_TEMPLATE);
  }

  #getFullMap = async () => {
    const url = REQUEST_URL + '/lines';
    const accessToken = this.props.accessTokenState.Data;

    try {
      const response = await fetchLineRead(url, accessToken);
      const lines = await response.json();

      this.#renderFullMap(lines);
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  #renderFullMap(lines) {
    $(`#${ID_SELECTOR.FULL_MAP_LINE_LIST}`).innerHTML = lines
      .map(this.#createLineTemplate)
      .join('');
  }

  #createLineTemplate(line) {
    const { name, stations, color } = line;

    return `
    <li class="${CLASS_SELECTOR.FULL_MAP_LINE_ITEM}">
      <h2 class="${CLASS_SELECTOR.FULL_MAP_LINE_TITLE} bg-${color}">${name}</h2>
      <ul class="${CLASS_SELECTOR.FULL_MAP_STATION_LIST}">
        ${stations
          .map(station => FULL_MAP_STATION_TEMPLATE(station.name, color))
          .join('')}
      </ul>
    </li>
    `;
  }
}

const FULL_MAP_STATION_TEMPLATE = (stationName, color) => `
  <li class="${CLASS_SELECTOR.FULL_MAP_STATION_ITEM} bg-${color}">
    <span class="${CLASS_SELECTOR.FULL_MAP_STATION_NAME}">${stationName}</span>
  </li>
`;

export default FullMapComponent;
