import { sum } from '../utils/calculate';

export default class UserDataManager {
  static instance;

  constructor() {
    if (UserDataManager.instance) return UserDataManager.instance;

    this.stations = [];
    this.lines = [];

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

  getTargetLineDataForEdit(lineName) {
    const targetLineData = this.lines.find((line) => line.name === lineName);
    const upStationName = targetLineData.stations[0].name;
    const downStationName = targetLineData.stations[targetLineData.stations.length - 1].name;
    const distanceArray = targetLineData.sections.map((section) => section.distance);
    const durationArray = targetLineData.sections.map((section) => section.duration);

    return {
      lineName: targetLineData.name,
      lineColor: targetLineData.color,
      distance: sum(distanceArray),
      duration: sum(durationArray),
      downStationName,
      upStationName,
    };
  }

  getStationNamesInTargetLine(lineName) {
    return this.lines.find((line) => line.name === lineName).stations.map((station) => station.name);
  }

  editLineData({ oldLineName, newLineName, newColor }) {
    const editTargetLine = this.lines.find((line) => line.name === oldLineName);
    editTargetLine.name = newLineName;
    editTargetLine.color = newColor;
  }

  removeLine(lineName) {
    this.lines = this.lines.filter((line) => line.name !== lineName);
  }

  updateTargetLineData(targetLineData) {
    const targetLineIndex = this.lines.findIndex((line) => line.name === targetLineData.name);
    this.lines.splice(targetLineIndex, 1, targetLineData);
  }
}
