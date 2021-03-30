import { request } from '../../../@shared/utils';
import { BASE_URL } from '../../constants';

const getLines = async accessToken => {
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

const addLine = async (accessToken, { name, color, upStationId, downStationId, distance, duration }) => {
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

const modifyLine = async (accessToken, { id, name, color, upStationId, downStationId, distance, duration }) => {
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

const removeLine = async (accessToken, { id }) => {
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
