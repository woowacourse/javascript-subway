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

  getTargetLineColor(lineName) {
    return this.lines.find((line) => line.name === lineName).color;
  }

  getTargetLineId(lineName) {
    return this.lines.find((line) => line.name === lineName).id;
  }

  getEditTargetLineData(lineName) {
    const targetLineData = this.lines.find((line) => line.name === lineName);
    const [targetSectionData] = targetLineData.sections;

    return {
      lineName: targetLineData.name,
      lineColor: targetLineData.color,
      distance: targetSectionData.distance,
      duration: targetSectionData.duration,
      downStationName: targetSectionData.downStation.name,
      upStationName: targetSectionData.upStation.name,
    };
  }

  editLineData({ oldLineName, newLineName, newColor }) {
    const editTargetLine = this.lines.find((line) => line.name === oldLineName);
    editTargetLine.name = newLineName;
    editTargetLine.color = newColor;
  }
}
