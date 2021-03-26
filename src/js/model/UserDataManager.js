export default class UserDataManager {
  static instance;

  constructor() {
    if (UserDataManager.instance) return UserDataManager.instance;

    this.stations = [];
    this.lines = [];
    this.sections = [];

    UserDataManager.instance = this;
  }

  setStation(stationData) {
    this.stations = [stationData, ...this.stations];
  }

  getStationId(stationName) {
    return this.stations.find((station) => station.name === stationName).id;
  }

  editStationName(oldStationName, newStationName) {
    this.stations.find((station) => station.name === oldStationName).name = newStationName;
  }

  removeStation(stationName) {
    this.stations = this.stations.filter((station) => station.name !== stationName);
  }
}
