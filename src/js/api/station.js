import { ACTIONS, BASE_URL, REQUEST_METHOD } from '../constants';
import { request } from '../utils/request';

export const stationAPI = {
  getStations: async userAccessToken => {
    const option = {
      Authorization: `Bearer ${userAccessToken}`,
    };

    const { response } = await request(
      `${BASE_URL}${ACTIONS.STATIONS}`,
      option,
    );
    return await response.json();
  },

  addStations: async ({ userAccessToken, name }) => {
    const option = {
      method: REQUEST_METHOD.POST,
      Authorization: `Bearer ${userAccessToken}`,
      body: {
        name,
      },
    };

    const { response } = await request(
      `${BASE_URL}${ACTIONS.STATIONS}`,
      option,
    );
    return await response.json();
  },

  deleteStations: async ({ userAccessToken, id }) => {
    const option = {
      method: REQUEST_METHOD.DELETE,
      Authorization: `Bearer ${userAccessToken}`,
    };

    await request(`${BASE_URL}${ACTIONS.STATIONS}/${id}`, option);
  },

  modifyStation: async ({ userAccessToken, id, name }) => {
    const option = {
      method: REQUEST_METHOD.PUT,
      Authorization: `Bearer ${userAccessToken}`,
      body: {
        name,
      },
    };

    await request(`${BASE_URL}${ACTIONS.STATIONS}/${id}`, option);
  },
};
