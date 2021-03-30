import { ACTIONS, BASE_URL, REQUEST_METHOD } from '../src/js/constants';
import { request } from '../src/js/utils/api';

export const lineAPI = {
  getLines: async userAccessToken => {
    const option = {
      Authorization: `Bearer ${userAccessToken}`,
    };

    return await request(`${BASE_URL}${ACTIONS.LINES}`, option).then(res => {
      return res.json();
    });
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

    return await request(`${BASE_URL}${ACTIONS.LINES}`, option).then(res => {
      return res.json();
    });
  },

  deleteLine: async ({ userAccessToken, id }) => {
    const option = {
      method: REQUEST_METHOD.DELETE,
      Authorization: `Bearer ${userAccessToken}`,
    };

    await request(`${BASE_URL}${ACTIONS.LINES}/${id}`, option);
  },
};
