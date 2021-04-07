import { ACTIONS, BASE_URL, REQUEST_METHOD } from '../constants';
import { request } from '../utils/request';

export const sectionAPI = {
  addSection: async ({ userAccessToken, sectionInfo }) => {
    const {
      ['line-select']: lineId,
      ['prev-station']: upStationId,
      ['next-station']: downStationId,
      distance,
      arrival: duration,
    } = sectionInfo;

    const isStartStation = Number(upStationId) < 0; // 출발역으로 지정 -> option의 value -기존 출발역 ID

    const option = {
      method: REQUEST_METHOD.POST,
      Authorization: `Bearer ${userAccessToken}`,
      body: {
        upStationId: isStartStation ? downStationId : upStationId,
        downStationId: isStartStation
          ? Math.abs(Number(upStationId))
          : downStationId,
        distance,
        duration,
      },
    };

    await request(
      `${BASE_URL}${ACTIONS.LINES}/${lineId}${ACTIONS.SECTIONS}`,
      option,
    );
  },

  deleteSection: async ({ userAccessToken, lineId, stationId }) => {
    const option = {
      method: REQUEST_METHOD.DELETE,
      Authorization: `Bearer ${userAccessToken}`,
    };

    await request(
      `${BASE_URL}${ACTIONS.LINES}/${lineId}${ACTIONS.SECTIONS}/?stationId=${stationId}`,
      option,
    );
  },
};
