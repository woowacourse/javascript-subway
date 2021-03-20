import { REQUEST_HEADER_HOST } from '../constants.js';
export const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    if (response.ok) {
      try {
        return await response.json();
      } catch (error) {
        return response;
      }
    }

    throw response.status;
  } catch (error) {
    throw error;
  }
};

export const getPostOption = (
  body,
  headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Host: REQUEST_HEADER_HOST,
  },
) => {
  return {
    method: 'POST',
    headers,
    body,
  };
};
