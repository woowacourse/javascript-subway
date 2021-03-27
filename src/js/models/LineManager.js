import {
  fetchAddLine,
  fetchAllLines,
  fetchDeleteLine,
  fetchModifyLine,
} from '../API/lines.js';
import user from './user.js';

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

  async deleteLine(lineId) {
    const resFlag = await fetchDeleteLine(lineId);

    if (resFlag) {
      delete this.lines[lineId];
    }

    return resFlag;
  }

  async modifyLine(modifiedLineId, modifiedLineInfo) {
    const resFlag = await fetchModifyLine(modifiedLineId, modifiedLineInfo);

    if (resFlag) {
      this.lines[modifiedLineId].name = modifiedLineInfo.name;
      this.lines[modifiedLineId].color = modifiedLineInfo.color;
      this.lines[modifiedLineId].upStation = this.createStationData(
        user.stationManager.getStation(modifiedLineInfo.upStationId)
      );
      this.lines[modifiedLineId].downStation = this.createStationData(
        user.stationManager.getStation(modifiedLineInfo.downStationId)
      );
      this.lines[modifiedLineId].distance = modifiedLineInfo.distance;
      this.lines[modifiedLineId].duration = modifiedLineInfo.duration;
      this.lines[modifiedLineId].stations = [
        this.createStationData(
          user.stationManager.getStation(modifiedLineInfo.upStationId)
        ),
        this.createStationData(
          user.stationManager.getStation(modifiedLineInfo.downStationId)
        ),
      ];
    }

    return resFlag;
  }

  getLine(lineId) {
    return this.lines[lineId];
  }

  async getAllLines() {
    const allLines = (await fetchAllLines()) ?? [];

    allLines.forEach(line => (this.lines[line.id] = this.createLineData(line)));

    return this.lines;
  }
}

export default LineManager;
