import { getFromSessionStorage, request } from '../../../@shared/utils';
import { BASE_URL, SESSION_KEY } from '../../constants';

const getLines = async () => {
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  if (!accessToken) return [];
  const url = `${BASE_URL}/lines`;
  const option = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await request(url, option);

    if (!response.ok) throw new Error(response.status);

    const lines = await response.json();

    return lines;
  } catch (error) {
    throw new Error(error);
  }
};

const addLine = async ({ name, color, upStationId, downStationId, distance, duration }) => {
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  const url = `${BASE_URL}/lines`;
  const option = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      color,
      upStationId,
      downStationId,
      distance,
      duration,
    }),
  };

  try {
    const response = await request(url, option);

    if (!response.ok) throw new Error(response.status);

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const modifyLine = async ({ id, name, color, upStationId, downStationId, distance, duration }) => {
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  const url = `${BASE_URL}/lines/${id}`;
  const option = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      color,
      upStationId,
      downStationId,
      distance,
      duration,
    }),
  };

  try {
    const response = await request(url, option);

    if (!response.ok) throw new Error(response.status);
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeLine = async ({ id }) => {
  const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
  const url = `${BASE_URL}/lines/${id}`;
  const option = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await request(url, option);

    if (!response.ok) throw new Error(response.status);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const lineManageAPI = {
  getLines,
  addLine,
  modifyLine,
  removeLine,
};
