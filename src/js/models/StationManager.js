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

  createStationData({ id, name }) {
    return { id, name };
  }

  async getAllStations() {
    const response = await fetchAllStations();

    if (response.ok) {
      try {
        const allStations = await response.json();
        allStations.forEach(station => {
          this.stations[station.id] = this.createStationData(station);
        });

        return { allStations: this.stations, response };
      } catch (error) {
        console.error(error);
      }
    }

    return { response };
  }

  async addStation(stationName) {
    const response = await fetchAddStation(stationName);

    if (response.ok) {
      try {
        const newStation = await response.json();
        this.stations[newStation.id] = this.createStationData(newStation);

        return { newStation: this.stations[newStation.id], response };
      } catch (error) {
        console.error(error);
      }
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
