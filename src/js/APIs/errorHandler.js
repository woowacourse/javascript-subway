import { ERROR_MESSAGE } from "../constants/messages";

const handleError = (response) => {
  if (response.status === 403) {
    throw new Error(ERROR_MESSAGE.GENERAL.FORBIDDEN);
  }

  if (response.status === 500) {
    throw new Error(ERROR_MESSAGE.GENERAL.API_CALL_FAILURE);
  }

  return response;
};

export default handleError;
