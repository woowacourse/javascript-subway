import { fetchAddLine, fetchAllLines } from '../API/lines.js';

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

  // async deleteLine(stationId) {
  //   const resFlag = await fetchDeleteStation(stationId);
  //   if (resFlag) {
  //     delete this.stations[stationId];
  //   }

  //   return resFlag;
  // }

  // async modifyLine(id, name) {
  //   const resFlag = await fetchModifyStation(id, name);
  //   if (resFlag) {
  //     this.stations[id] = { id, name };
  //   }

  //   return resFlag;
  // }

  async getAllLines() {
    const allLines = (await fetchAllLines()) ?? [];

    allLines.forEach(line => (this.lines[line.id] = this.createLineData(line)));

    return this.lines;
  }
}

export default LineManager;
