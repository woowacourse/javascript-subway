import { fetchAddLine } from '../API/lines.js';

class LineManager {
  constructor() {
    this.lines = {};
  }

  createStationData({ id, name }) {
    return { id, name };
  }

  createLineData({ id, name, color, stations, sections }) {
    return {
      id: id,
      name: name,
      color: color,
      stations: stations.map(station => this.createStationData(station)),
      upStation: this.createStationData(sections[0].upStation),
      downStation: this.createStationData(sections[0].downStation),
      distance: sections[0].distance,
      duration: sections[0].duration,
    };
  }

  async addLine(newLineInfo) {
    const newLine = await fetchAddLine(newLineInfo);
    this.lines[newLine.id] = this.createLineData(newLine);

    return newLine;
  }
}

export default LineManager;
