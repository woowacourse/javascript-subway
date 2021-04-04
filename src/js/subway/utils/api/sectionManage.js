import { getFromSessionStorage, request } from '../../../@shared/utils';
import { BASE_URL, SESSION_KEY } from '../../constants';

const addSection = async ({ id, upStationId, downStationId, distance, duration }) => {
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  const url = `${BASE_URL}/lines/${id}/sections`;
  const option = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      upStationId,
      downStationId,
      distance,
      duration,
    }),
  };

  try {
    const response = await request(url, option);

    if (!response.ok) throw new Error(await response.text());
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeSection = async ({ lineId, stationId }) => {
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  const url = `${BASE_URL}/lines/${lineId}/sections?stationId=${stationId}`;
  const option = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await request(url, option);

    if (!response.ok) throw new Error(response.status);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sectionManageAPI = {
  addSection,
  removeSection,
};
