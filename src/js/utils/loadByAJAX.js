import { fetchStationRead, fetchLineListRead } from './fetch.js';

const loadStationList = async (stationsState, accessToken) => {
  try {
    const response = await fetchStationRead(accessToken);

    const stationResponse = await response.json();
    const stations = stationResponse.map(station => ({
      id: station.id,
      name: station.name,
    }));

    stationsState.Data = stations;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loadLineList = async (linesState, accessToken) => {
  try {
    const response = await fetchLineListRead(accessToken);

    const lineResponse = await response.json();
    const lines = lineResponse.map(line => ({
      id: line.id,
      name: line.name,
      color: line.color,
    }));

    linesState.Data = lines;
  } catch (err) {
    throw new Error(error.message);
  }
};

export { loadStationList, loadLineList };
