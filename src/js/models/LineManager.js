import {
  fetchAddLine,
  fetchAllLines,
  fetchDeleteLine,
  fetchModifyLine,
} from '../API/lines.js';
import { fetchAddSection, fetchDeleteSection } from '../API/sections.js';

import StationManager from './StationManager.js';

class LineManager {
  constructor() {
    this.stationManager = new StationManager();
    this.lines = [];
  }

  async getAllLines() {
    const response = await fetchAllLines();

    if (response.ok) {
      const allLines = await response.json();
      this.lines = [...allLines];

      return { allLines, response };
    }

    return { response };
  }

  async addLine(newLineInfo) {
    const response = await fetchAddLine(newLineInfo);

    if (response.ok) {
      try {
        const newLine = await response.json();
        this.lines = [...this.lines, newLine];

        return { newLine, response };
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
    return this.lines.filter(line => line.id === Number(lineId));
  }
}

export default LineManager;
