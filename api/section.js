import { ACTIONS, BASE_URL, REQUEST_METHOD } from '../src/js/constants';
import { request } from '../src/js/utils/api';
import { isInRange } from '../src/js/utils/validation';

export const sectionAPI = {
  addSection: async ({ userAccessToken, sectionInfo }) => {
    const {
      ['line-select']: lineId,
      ['prev-station']: upStationId,
      ['next-station']: downStationId,
      distance,
      arrival: duration,
    } = sectionInfo;

    const isStart = isInRange(Number(upStationId), { min: 0 });

    const option = {
      method: REQUEST_METHOD.POST,
      Authorization: `Bearer ${userAccessToken}`,
      body: {
        upStationId: isStart ? upStationId : downStationId,
        downStationId: isStart ? downStationId : Math.abs(Number(upStationId)),
        distance,
        duration,
      },
    };

    await request(
      `${BASE_URL}${ACTIONS.LINES}/${lineId}/${ACTIONS.SECTIONS}`,
      option,
    );
  },

  // deleteLine: async ({ userAccessToken, id }) => {
  //   const option = {
  //     method: REQUEST_METHOD.DELETE,
  //     Authorization: `Bearer ${userAccessToken}`,
  //   };

  //   await request(`${BASE_URL}${ACTIONS.LINES}/${id}`, option);
  // },
};
