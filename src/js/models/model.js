import { lineAPI } from '../../../api/line';
import { stationAPI } from '../../../api/station';
import { ERROR_MESSAGE } from '../constants';

export const initStations = async userAccessToken => {
  try {
    const stations = await stationAPI.getStations(userAccessToken);

    const result = stations.reduce((newStations, { id, name }) => {
      return {
        ...newStations,
        [id]: name,
      };
    }, {});

    return result;
  } catch {
    alert(ERROR_MESSAGE.LOAD_STATION_FAILED);
  }
};

export const initLines = async userAccessToken => {
  try {
    const lines = await lineAPI.getLines(userAccessToken);

    const result = lines.reduce((newLines, { id, name, color }) => {
      return {
        ...newLines,
        [id]: { name, color },
      };
    }, {});

    return result;
  } catch {
    alert(ERROR_MESSAGE.LOAD_LINE_FAILED);
  }
};

export const initSections = async userAccessToken => {
  try {
    const lines = await lineAPI.getLines(userAccessToken);

    const result = lines.reduce(
      (newSections, { id, name, color, stations, sections }) => {
        return {
          ...newSections,
          [id]: { name, color, stations, sections },
        };
      },
      {},
    );

    return result;
  } catch {
    alert(ERROR_MESSAGE.LOAD_LINE_FAILED);
  }
};
