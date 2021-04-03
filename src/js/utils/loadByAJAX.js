import { REQUEST_URL } from '../constants.js';
import { fetchStationRead, fetchLineListRead } from './fetch.js';

//TODO: load = fetch + state에 담기라서 네이밍 고민해보기
const loadStationList = async (stationsState, accessToken) => {
  try {
    const response = await fetchStationRead(accessToken);

    const stationResponse = await response.json();
    const stations = stationResponse.map(station => ({
      id: station.id,
      name: station.name,
    }));

    stationsState.Data = stations;
  } catch (err) {
    alert(err.message);
    return;
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
    alert(err.message);
    return;
  }
};

export { loadStationList, loadLineList };
