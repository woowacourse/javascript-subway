import { ACTIONS, BASE_URL, REQUEST_METHOD } from '../constants';
import { request } from '../utils/request';

export const lineAPI = {
  getLines: async userAccessToken => {
    const option = {
      Authorization: `Bearer ${userAccessToken}`,
    };

    const { response } = await request(`${BASE_URL}${ACTIONS.LINES}`, option);
    return await response.json();
  },

  addLine: async ({ userAccessToken, lineInfo }) => {
    const option = {
      method: REQUEST_METHOD.POST,
      Authorization: `Bearer ${userAccessToken}`,
      body: {
        name: lineInfo['subway-line-name'],
        color: lineInfo['subway-line-color'],
        upStationId: lineInfo['up-station'],
        downStationId: lineInfo['down-station'],
        distance: lineInfo['distance'],
        duration: lineInfo['arrival'],
      },
    };

    const { response } = await request(`${BASE_URL}${ACTIONS.LINES}`, option);
    return await response.json();
  },

  deleteLine: async ({ userAccessToken, id }) => {
    const option = {
      method: REQUEST_METHOD.DELETE,
      Authorization: `Bearer ${userAccessToken}`,
    };

    await request(`${BASE_URL}${ACTIONS.LINES}/${id}`, option);
  },

  modifyLine: async ({ userAccessToken, id, name, color }) => {
    const option = {
      method: REQUEST_METHOD.PUT,
      Authorization: `Bearer ${userAccessToken}`,
      body: {
        name,
        color,
      },
    };

    await request(`${BASE_URL}${ACTIONS.LINES}/${id}`, option);
  },
};
