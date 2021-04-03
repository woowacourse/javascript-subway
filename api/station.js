import { ACTIONS, BASE_URL, REQUEST_METHOD } from '../src/js/constants';
import { request } from '../src/js/utils/api';

export const stationAPI = {
  getStations: async userAccessToken => {
    const option = {
      Authorization: `Bearer ${userAccessToken}`,
    };

    return await request(`${BASE_URL}${ACTIONS.STATIONS}`, option).then(res => {
      return res.json();
    });
  },

  addStations: async ({ userAccessToken, name }) => {
    const option = {
      method: REQUEST_METHOD.POST,
      Authorization: `Bearer ${userAccessToken}`,
      body: {
        name,
      },
    };

    return await request(`${BASE_URL}${ACTIONS.STATIONS}`, option).then(res => {
      return res.json();
    });
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
