import { ERROR_MESSAGE } from "../constants/messages.js";

export const getSessionStorageItem = (key, defaultValue = "") => {
  const item = sessionStorage.getItem(key);

  return item ?? defaultValue;
};

export const setSessionStorageItem = (key, value) => {
  try {
    if (typeof value !== "string") {
      throw new Error(ERROR_MESSAGE.GENERAL.TYPE_REQUIRED_STRING);
    }

    sessionStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const removeSessionStorageItem = (key) => {
  sessionStorage.removeItem(key);
};
