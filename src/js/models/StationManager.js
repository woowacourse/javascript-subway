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
    const allStations = (await fetchAllStations()) ?? [];

    allStations.forEach(
      station => (this.stations[station.id] = this.createStationData(station))
    );

    return this.stations;
  }

  async addStation(stationName) {
    // TODO : ?? null일때 왜 console.log가 안찍힐까
    const newStation = (await fetchAddStation(stationName)) ?? null;
    this.stations[newStation.id] = this.createStationData(newStation);

    return newStation;
  }

  async modifyStation(id, name) {
    const resFlag = await fetchModifyStation(id, name);
    if (resFlag) {
      this.stations[id] = { id, name };
    }

    return resFlag;
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
