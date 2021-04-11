import { reportError, GET, handleException } from '../../../utils/index.js';
import { API_ENDPOINT, LINES_MESSAGES } from '../../../constants/index.js';

export default async function requestReadLine() {
  try {
    const response = await GET(API_ENDPOINT.LINES);

    if (!response.ok) {
      await handleException(response);
      return [];
    }

    const body = await response.json();
    return body;
  } catch (error) {
    reportError({
      messageToUser: LINES_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    return [];
  }
}
