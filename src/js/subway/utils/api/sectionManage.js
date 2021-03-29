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
    const res = await request(url, option);
    console.log(await res.text());
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sectionManageAPI = {
  addSection,
};
