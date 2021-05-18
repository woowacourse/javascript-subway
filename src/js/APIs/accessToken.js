import { getSessionStorageItem } from "../utils/sessionStorage.js";
import { TOKEN_STORAGE_KEY } from "../constants/general.js";
import { ERROR_MESSAGE } from "../constants/messages.js";

const getAccessToken = () => {
  const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");

  if (accessToken === "") {
    throw Error(ERROR_MESSAGE.GENERAL.NO_ACCESS_TOKEN);
  }

  return accessToken;
};

export default getAccessToken;
