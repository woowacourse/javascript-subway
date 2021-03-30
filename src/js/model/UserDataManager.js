export default class UserDataManager {
  static instance;

  constructor() {
    if (UserDataManager.instance) return UserDataManager.instance;

    this.stations = [];
    this.lines = [];
    this.sections = [];

    UserDataManager.instance = this;
  }

  setStationData(stationData) {
    if (Array.isArray(stationData)) {
      this.stations = stationData;
      return;
    }

    this.stations = [...this.stations, stationData];
  }

  getTargetStationId(stationName) {
    return this.stations.find((station) => station.name === stationName).id;
  }

  editStationName(oldStationName, newStationName) {
    this.stations.find((station) => station.name === oldStationName).name = newStationName;
  }

  removeStation(stationName) {
    this.stations = this.stations.filter((station) => station.name !== stationName);
  }

  setLineData(lineData) {
    if (Array.isArray(lineData)) {
      this.lines = lineData;
      return;
    }

    this.lines = [...this.lines, lineData];
  }

  getLineColors() {
    return this.lines.map((line) => line.color);
  }

  getEditTargetLineData(lineName) {
    const targetLineData = this.lines.find((line) => line.name === lineName);
    const targetSectionData = targetLineData.sections[0];

    return {
      lineName: targetLineData.name,
      lineColor: targetLineData.color,
      distance: targetSectionData.distance,
      duration: targetSectionData.duration,
      downStationName: targetSectionData.downStation.name,
      upStationName: targetSectionData.upStation.name,
    };
  }
}
