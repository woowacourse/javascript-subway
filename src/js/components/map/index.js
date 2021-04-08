import { getSubwayState } from '../../api/apis';
import Component from '../../core/Component';
import { mainTemplate, stationItem, connectedLine } from './template/main.js';
import { $ } from '../../utils/DOM.js';

class Map extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers, {}, { stations: [], lines: [] });
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate(this.state.lines);
  }

  addEventListeners() {
    $('.js-all-lines-container').addEventListener('click', ({ target }) => {
      if (!target.closest('.subway-lines-container')) return;

      const line = this.state.lines.find(
        (line) => line.id === Number(target.dataset.id)
      );

      $('.js-all-stations').innerHTML = line.stations
        .map((station, index) => {
          const isLineEnded = line.stations.length - 1 === index;
          if (isLineEnded) {
            return stationItem(station, line, isLineEnded);
          }

          const nextStation = line.stations[index + 1];
          const { duration, distance } = this.findDurationAndDistance(
            station,
            nextStation,
            line
          );

          return (
            stationItem(station, line, isLineEnded) +
            connectedLine(duration, distance)
          );
        })
        .join('');
    });
  }

  findDurationAndDistance(station, nextStation, line) {
    return line.sections.filter(
      ({ duration, distance, upStation, downStation }) => {
        if (
          [station.name, nextStation.name].includes(upStation.name) &&
          [station.name, nextStation.name].includes(downStation.name)
        ) {
          return { duration: duration, distance: distance };
        }
      }
    )[0];
  }

  async updateSubwayState() {
    const accessToken = this.stateManagers.accessToken.getToken();
    const { stations, lines } = await getSubwayState(accessToken);
    this.setState({ stations, lines });
  }
}

export default Map;
