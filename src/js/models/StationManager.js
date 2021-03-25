import {
  fetchAddStation,
  fetchAllStations,
  fetchDeleteStation,
} from '../API/stations.js';

class StationManager {
  constructor() {
    this.stations = {};
  }
  // TODO: 네이밍 생각해보기
  createStationData({ id, name }) {
    return { id, name };
  }

  async addStation(stationName) {
    // TODO : ?? null일때 왜 console.log가 안찍힐까
    const newStation = (await fetchAddStation(stationName)) ?? null;
    this.stations[newStation.id] = this.createStationData(newStation);

    return newStation;
  }

  async deleteStation(stationId) {
    const resFlag = await fetchDeleteStation(stationId);
    if (resFlag) {
      delete this.stations[stationId];
    }

    return resFlag;
  }

  modifyStation(id, name) {
    // TODO: fetch
    this.stations[id] = { id, name };
  }

  async getAllStations() {
    const allStations = (await fetchAllStations()) ?? [];

    allStations.forEach(
      station => (this.stations[station.id] = this.createStationData(station))
    );

    return this.stations;
  }
}

export default StationManager;
