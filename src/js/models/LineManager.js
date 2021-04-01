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
      sections,
      stations: stations.map(station => this.createStationData(station)),
      upStation: this.createStationData(stations[0]),
      downStation: this.createStationData(stations[stations.length - 1]),
      distance: sections
        .map(({ distance }) => distance)
        .reduce((sum, currentDistance) => sum + currentDistance, 0),
      duration: sections
        .map(({ duration }) => duration)
        .reduce((sum, currentDuration) => sum + currentDuration, 0),
    };
  }

  async getAllLines() {
    const response = await fetchAllLines();

    if (response.ok) {
      try {
        const allLines = await response.json();
        allLines.forEach(
          line => (this.lines[line.id] = this.createLineData(line))
        );

        return { allLines: this.lines, response };
      } catch (error) {
        console.error(error);
      }
    }

    return { response };
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

    return response;
  }

  getLine(lineId) {
    return this.lines[lineId];
  }

  getAllStationsInLine(lineId) {
    return this.lines[lineId].stations;
  }

  getSection(lineId, upStationId) {
    return this.lines[lineId].sections.filter(
      section => section.upStation.id === upStationId
    )[0];
  }

  getAllSections(lineId) {
    this.lines[lineId].sections;
    const sortedSections = this.lines[lineId].stations.map(({ id }) =>
      this.getSection(lineId, id)
    );
    this.lines[lineId].sections = sortedSections.filter(
      section => section !== undefined
    );

    return this.lines[lineId].sections;
  }

  async addSection(newSectionInfo, lineId) {
    const response = await fetchAddSection(newSectionInfo, lineId);

    if (response.ok) {
      const upStationIndex = this.lines[lineId].stations.findIndex(
        ({ id }) => id === newSectionInfo.upStationId
      );
      const downStationIndex = this.lines[lineId].stations.findIndex(
        ({ id }) => id === newSectionInfo.downStationId
      );

      if (upStationIndex === -1) {
        const newSectionId = newSectionInfo.upStationId;
        const newSection = this.createStationData(
          user.stationManager.getStation(newSectionId)
        );

        this.lines[lineId].stations.splice(downStationIndex, 0, newSection);
      } else {
        const newSectionId = newSectionInfo.downStationId;
        const newSection = this.createStationData(
          user.stationManager.getStation(newSectionId)
        );

        this.lines[lineId].stations.splice(upStationIndex + 1, 0, newSection);
      }
    }

    return response;
  }

  async deleteSection(lineId, stationId) {
    const response = await fetchDeleteSection(lineId, stationId);

    if (!response.ok) {
      this.lines[lineId].stations = this.lines[lineId].stations.filter(
        station => station.id !== Number(stationId)
      );
    }

    return response;
  }

  getSectionsLength(lineId) {
    return this.lines[lineId].stations.length;
  }
}

export default LineManager;
