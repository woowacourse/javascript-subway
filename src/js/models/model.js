import { lineAPI } from '../../../api/line';
import { stationAPI } from '../../../api/station';
import { ERROR_MESSAGE } from '../constants';

export const initStations = async userAccessToken => {
  try {
    const newStations = {};
    const stations = await stationAPI.getStations(userAccessToken);
    stations.forEach(({ id, ...rest }) => {
      newStations[id] = rest;
    });

    return newStations;
  } catch {
    alert(ERROR_MESSAGE.LOAD_STATION_FAILED);
  }
};

export const initLines = async userAccessToken => {
  try {
    const newLines = {};

    const lines = await lineAPI.getLines(userAccessToken);
    lines.forEach(({ id, name, color }) => {
      newLines[id] = { name, color };
    });
    return newLines;
  } catch {
    alert(ERROR_MESSAGE.LOAD_LINE_FAILED);
  }
};

export const initSections = async userAccessToken => {
  try {
    const newSections = {};

    const sections = await lineAPI.getLines(userAccessToken);

    sections.forEach(({ id, name, color, stations }) => {
      newSections[id] = { name, color, stations };
    });

    return newSections;
  } catch {
    alert(ERROR_MESSAGE.LOAD_LINE_FAILED);
  }
};
