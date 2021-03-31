import { REQUEST_URL } from '../constants.js';
import { fetchStationRead, fetchLineRead } from './fetch.js';

//TODO: load = fetch + state에 담기라서 네이밍 고민해보기
const loadStationList = async (stationsState, accessToken) => {
  const url = REQUEST_URL + '/stations';
  try {
    const response = await fetchStationRead(url, accessToken);

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
  const url = REQUEST_URL + '/lines';

  try {
    const response = await fetchLineRead(url, accessToken);

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
