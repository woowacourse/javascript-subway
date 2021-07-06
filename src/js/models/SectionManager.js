import {
  fetchAddSection,
  fetchDeleteSection,
  fetchMap,
} from '../API/sections.js';

import StationManager from './StationManager.js';

class SectionManager {
  constructor() {
    this.stationManager = new StationManager();
  }

  async getMap() {
    const response = await fetchMap();

    if (response.ok) {
      const Map = await response.json();

      return { Map, response };
    }

    return { response };
  }

  async getSelectedSection(targetLineId) {
    const response = await fetchMap();

    if (response.ok) {
      const Map = await response.json();
      const [targetLine] = Map.filter(line => line.id === Number(targetLineId));

      return { targetLine, response };
    }

    return { response };
  }

  async addSection(newSectionInfo, lineId) {
    const response = await fetchAddSection(newSectionInfo, lineId);

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
}

export default SectionManager;
