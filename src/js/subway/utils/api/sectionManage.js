import { request } from '../../../@shared/utils';
import { BASE_URL } from '../../constants';

const addSection = async (accessToken, { id, upStationId, downStationId, distance, duration }) => {
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

const removeSection = async (accessToken, { lineId, stationId }) => {
  const url = `${BASE_URL}/lines/${lineId}/sections?stationId=${stationId}`;
  const option = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    await request(url, option);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sectionManageAPI = {
  addSection,
  removeSection,
};
