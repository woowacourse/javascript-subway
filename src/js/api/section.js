import httpClient from './httpClient';
import { SECTION } from '../constants/alertMessage';

export const requestAddSection = async ({ lineId, upStationId, downStationId, distance, duration }) => {
  try {
    const response = await httpClient.post(`/lines/${lineId}/sections`, {
      upStationId,
      downStationId,
      distance,
      duration,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message ?? SECTION.ADD_SECTION_FAILED,
    };
  }
};
