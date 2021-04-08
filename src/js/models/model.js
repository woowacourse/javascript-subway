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
    const lines = await lineAPI.getLines(userAccessToken);

    return lines.reduce((prev, { id, name, color }) => {
      prev[id] = { name, color };
      return prev;
    }, {});
  } catch {
    alert(ERROR_MESSAGE.LOAD_LINE_FAILED);
  }
};

export const initSections = async userAccessToken => {
  try {
    const sections = await lineAPI.getLines(userAccessToken);

    return sections.reduce((prev, { id, name, color, stations }) => {
      prev[id] = { name, color, stations };
      return prev;
    }, {});
  } catch {
    alert(ERROR_MESSAGE.LOAD_LINE_FAILED);
  }
};
