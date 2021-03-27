import { REQUEST_URL, STATE_KEY } from '../constants';
import { fetchStationList } from './fetch';

//TODO: load = fetch + state에 담기라서 네이밍 고민해보기
export const loadStationList = async (state, accessToken) => {
  const url = REQUEST_URL + '/stations';

  try {
    const response = await fetchStationList(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const stationResponse = await response.json();
    const stations = stationResponse.map(station => ({
      id: station.id,
      name: station.name,
    }));

    state.setData({ [STATE_KEY.STATION]: stations });
  } catch (err) {
    alert(err.message);
    return;
  }
};
