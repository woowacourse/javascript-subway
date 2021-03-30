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

  async getAllLines() {
    const allLines = (await fetchAllLines()) ?? [];

    allLines.forEach(line => (this.lines[line.id] = this.createLineData(line)));

    return this.lines;
  }

  async addLine(newLineInfo) {
    const response = await fetchAddLine(newLineInfo);

    if (response.ok) {
      try {
        const newLine = await response.json();
        this.lines[newLine.id] = this.createLineData(newLine);
        return { newLine: this.lines[newLine.id], response };
      } catch (error) {
        console.error(error);
      }
    }

    return { response };
  }

  async modifyLine(modifiedLineId, { name, color }) {
    const response = await fetchModifyLine(modifiedLineId, {
      name,
      color,
    });

    if (response.ok) {
      this.lines[modifiedLineId] = {
        ...this.lines[modifiedLineId],
        name,
        color,
      };
    }

    return response;
  }

  async deleteLine(lineId) {
    const response = await fetchDeleteLine(lineId);

    if (response.ok) {
      delete this.lines[lineId];
    }

    return response.ok;
  }

  getLine(lineId) {
    return this.lines[lineId];
  }

  getAllSections(lineId) {
    return this.lines[lineId].stations;
  }

  async addSection(newSectionInfo, lineId) {
    const resFlag = await fetchAddSection(newSectionInfo, lineId);

    const upStationIndex = this.lines[lineId].stations.findIndex(
      ({ id }) => id === newSectionInfo.upStationId
    );

    const newSectionId =
      upStationIndex === -1
        ? newSectionInfo.upStationId
        : newSectionInfo.downStationId;

    const newSection = this.createStationData(
      user.stationManager.getStation(newSectionId)
    );

    if (resFlag) {
      this.lines[lineId].stations.splice(upStationIndex + 1, 0, newSection);
    }

    return resFlag;
  }

  async deleteSection(lineId, stationId) {
    const response = await fetchDeleteSection(lineId, stationId);

    if (!response.ok) {
      this.lines[lineId].stations = this.lines[lineId].stations.filter(
        station => station.id !== Number(stationId)
      );
    }

    return response.ok;
  }

  getSectionsLength(lineId) {
    return this.lines[lineId].stations.length;
  }
}

export default LineManager;
