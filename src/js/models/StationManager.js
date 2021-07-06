import {
  fetchAddStation,
  fetchAllStations,
  fetchDeleteStation,
  fetchModifyStation,
} from '../API/stations.js';

class StationManager {
  constructor() {
    this.stations = {};
  }

  async getAllStations() {
    const response = await fetchAllStations();

    if (response.ok) {
      const allStations = await response.json();

      allStations.forEach(station => {
        this.stations[station.id] = { id: station.id, name: station.name };
      });

      return { allStations, response };
    }

    return { response };
  }

  async addStation(stationName) {
    const response = await fetchAddStation(stationName);

    if (response.ok) {
      const newStation = await response.json();
      this.stations[newStation.id] = {
        id: newStation.id,
        name: newStation.name,
      };

      return {
        newStation: this.stations[newStation.id],
        response,
      };
    }

    return { response };
  }

  async modifyStation(id, name) {
    const response = await fetchModifyStation(id, name);
    if (response.ok) {
      this.stations[id] = { id, name };
    }

    return response;
  }

  async deleteStation(stationId) {
    const response = await fetchDeleteStation(stationId);

    if (response.ok) {
      delete this.stations[stationId];
    }

    return response;
  }

  getStation(stationId) {
    return this.stations[stationId];
  }
}

export default StationManager;
