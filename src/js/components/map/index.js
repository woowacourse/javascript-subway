import Component from '../../core/Component';
import { mainTemplate, stationItem, connectedLine } from './template/main.js';
import { $ } from '../../utils/DOM.js';
import division from '../../utils/division.js';
import { MAP } from '../../constants/selector.js';
import getSubwayState from '../../api/getState.js';

class Map extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers, {}, { stations: [], lines: [] });
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate(this.state.lines);
  }

  addEventListeners() {
    $(MAP.CLASS.ALL_LINES_CONTAINER).addEventListener('click', ({ target }) => {
      if (!target.closest(MAP.CLASS.SUBWAY_LINES_CONTAINER)) return;

      const clickedLine = this.state.lines.find(
        (line) => line.id === Number(target.dataset.id)
      );

      const allStations = clickedLine.stations
        .map((station, index) => {
          const isLineEnded = clickedLine.stations.length - 1 === index;
          if (isLineEnded) {
            return stationItem(station, clickedLine, isLineEnded);
          }

          const nextStation = clickedLine.stations[index + 1];
          const { duration, distance } = this.findDurationAndDistance(
            station,
            nextStation,
            clickedLine
          );
          return (
            stationItem(station, clickedLine, isLineEnded) +
            connectedLine(duration, distance)
          );
        })
        .join('');

      $(MAP.CLASS.ALL_STATIONS).innerHTML = allStations;
    });
  }

  findDurationAndDistance(station, nextStation, line) {
    return line.sections.find(
      ({ duration, distance, upStation, downStation }) => {
        if (
          [station.name, nextStation.name].includes(upStation.name) &&
          [station.name, nextStation.name].includes(downStation.name)
        ) {
          return { duration, distance };
        }
      }
    );
  }

  async updateSubwayState() {
    const accessToken = this.stateManagers.accessToken.getToken();
    const { stations, lines } = await getSubwayState(accessToken);
    this.setState({ stations, lines });
  }
}

export default Map;
