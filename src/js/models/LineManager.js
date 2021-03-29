import {
  fetchAddLine,
  fetchAllLines,
  fetchDeleteLine,
  fetchModifyLine,
} from '../API/lines.js';
import { fetchAddSection, fetchDeleteSection } from '../API/sections.js';
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
      id,
      name,
      color,
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
      this.lines[modifiedLineId].name = modifiedLineInfo;
      this.lines[modifiedLineId].color = modifiedLineInfo;
      this.lines[modifiedLineId].upStation = this.createStationData(
        user.stationManager.getStation(modifiedLineInfo.upStationId)
      );
      this.lines[modifiedLineId].downStation = this.createStationData(
        user.stationManager.getStation(modifiedLineInfo.downStationId)
      );
      this.lines[modifiedLineId].distance = modifiedLineInfo.distance;
      this.lines[modifiedLineId].duration = modifiedLineInfo.duration;
      this.lines[modifiedLineId].stations.splice(
        0,
        1,
        this.createStationData(
          user.stationManager.getStation(modifiedLineInfo.upStationId)
        )
      );
      this.lines[modifiedLineId].stations.splice(
        this.getSectionsLength(modifiedLineId) - 1,
        1,
        this.createStationData(
          user.stationManager.getStation(modifiedLineInfo.upStationId)
        )
      );
    }

    return resFlag;
  }

  getLine(lineId) {
    return this.lines[lineId];
  }

  getAllSections(lineId) {
    return this.lines[lineId].stations;
  }

  getSectionsLength(lineId) {
    return this.lines[lineId].stations.length;
  }

  async getAllLines() {
    const allLines = (await fetchAllLines()) ?? [];

    allLines.forEach(line => (this.lines[line.id] = this.createLineData(line)));

    return this.lines;
  }

  async addSection(newSectionInfo, lineId) {
    const resFlag = await fetchAddSection(newSectionInfo, lineId);

    const upStationIndex = this.lines[lineId].stations.findIndex(
      station => station.id === newSectionInfo.upStationId
    );
    const newSection =
      upStationIndex === -1
        ? this.createStationData(
            user.stationManager.getStation(newSectionInfo.upStationId)
          )
        : this.createStationData(
            user.stationManager.getStation(newSectionInfo.downStationId)
          );

    if (resFlag) {
      this.lines[lineId].stations.splice(upStationIndex + 1, 0, newSection);
    }

    return resFlag;
  }

  async deleteSection(lineId, stationId) {
    console.log(lineId, stationId);

    const resFlag = await fetchDeleteSection(lineId, stationId);
    if (resFlag) {
      this.lines[lineId].stations = this.lines[lineId].stations.filter(
        station => station.id !== Number(stationId)
      );
    }

    return resFlag;
  }
}

export default LineManager;
