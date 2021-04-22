import { ACTIONS, BASE_URL, REQUEST_METHOD } from '../constants';
import { request } from '../utils/request';
import { getLocalStorageItem } from '../utils/storage';

export const authAPI = {
  isValidUserAccessToken: async storageKey => {
    const userAccessToken = getLocalStorageItem(storageKey);
    if (!userAccessToken) return false;

    try {
      const option = {
        Authorization: `Bearer ${userAccessToken}`,
        Accept: 'application/json',
      };

      await request(`${BASE_URL}${ACTIONS.USER}`, option);

      return true;
    } catch {
      return false;
    }
  },

  login: async data => {
    const option = {
      method: REQUEST_METHOD.POST,
      body: {
        email: data.email,
        password: data.password,
      },
    };

    const { response } = await request(`${BASE_URL}${ACTIONS.LOGIN}`, option);
    const { accessToken } = await response.json();

    return accessToken;
  },

  signup: async data => {
    const option = {
      method: REQUEST_METHOD.POST,
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    };

    await request(`${BASE_URL}${ACTIONS.REGISTER}`, option);
  },

  checkDuplicatedEmail: async email => {
    await request(`${BASE_URL}${ACTIONS.DUPLICATED_EMAIL}${email}`, {});
  },
};
