import { request } from '../../../@shared/utils';
import { BASE_URL } from '../../constants';

const getStations = async accessToken => {
  if (!accessToken) return [];
  const url = `${BASE_URL}/stations`;
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

    const stations = await response.json();

    return stations;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addStation = async (accessToken, { name }) => {
  const url = `${BASE_URL}/stations`;
  const option = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
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

const modifyStation = async (accessToken, { id, name }) => {
  const url = `${BASE_URL}/stations/${id}`;
  const option = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  };
  try {
    const response = await request(url, option);

    if (!response.ok) throw new Error(response.status);
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeStation = async (accessToken, { id }) => {
  const url = `${BASE_URL}/stations/${id}`;
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

export const stationManageAPI = {
  getStations,
  addStation,
  modifyStation,
  removeStation,
};
