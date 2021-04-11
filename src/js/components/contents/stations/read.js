import { reportError, GET, handleException } from '../../../utils/index.js';
import { API_ENDPOINT, STATIONS_MESSAGES } from '../../../constants/index.js';

export default async function requestReadStation() {
  try {
    const response = await GET(API_ENDPOINT.STATIONS);

    if (!response.ok) {
      await handleException(response);
      return [];
    }

    const body = await response.json();
    return body;
  } catch (error) {
    reportError({
      messageToUser: STATIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    return [];
  }
}
