import { sum } from '../utils/calculate';
import { ERROR_MESSAGE } from '../utils/constants';

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
    try {
      return this.stations.find((station) => station.name === stationName).id;
    } catch (error) {
      throw new Error(ERROR_MESSAGE.FIND_EDIT_STATION_FAIL);
    }
  }

  editStationName(oldStationName, newStationName) {
    try {
      this.stations.find((station) => station.name === oldStationName).name = newStationName;
    } catch (error) {
      console.error(error);
    }
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
    try {
      return this.lines.find((line) => line.name === lineName).color;
    } catch (error) {
      throw new Error(ERROR_MESSAGE.GET_TARGET_LINE_COLOR_FAIL);
    }
  }

  getTargetLineId(lineName) {
    try {
      return this.lines.find((line) => line.name === lineName).id;
    } catch (error) {
      throw new Error(ERROR_MESSAGE.FIND_EDIT_LINE_FAIL);
    }
  }

  getTargetLineDataForEdit(lineName) {
    try {
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
    } catch (error) {
      throw new Error(ERROR_MESSAGE.FIND_EDIT_LINE_DATA_FAIL);
    }
  }

  getStationNamesInTargetLine(lineName) {
    try {
      return this.lines.find((line) => line.name === lineName).stations.map((station) => station.name);
    } catch (error) {
      throw new Error(ERROR_MESSAGE.GET_STATION_NAME_FAIL);
    }
  }

  editLineData({ oldLineName, newLineName, newColor }) {
    try {
      const editTargetLine = this.lines.find((line) => line.name === oldLineName);
      editTargetLine.name = newLineName;
      editTargetLine.color = newColor;
    } catch (error) {
      console.error(error);
    }
  }

  removeLine(lineName) {
    this.lines = this.lines.filter((line) => line.name !== lineName);
  }

  updateTargetLineData(targetLineData) {
    try {
      const targetLineIndex = this.lines.findIndex((line) => line.name === targetLineData.name);
      this.lines.splice(targetLineIndex, 1, targetLineData);
    } catch (error) {
      console.error(error);
    }
  }
}
