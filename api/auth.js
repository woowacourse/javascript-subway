import { ACTIONS, BASE_URL, REQUEST_METHOD } from '../src/js/constants';
import { request } from '../src/js/utils/api';
import { getLocalStorageItem } from '../src/js/utils/storage';

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

    const { accessToken } = await request(
      `${BASE_URL}${ACTIONS.LOGIN}`,
      option,
    ).then(res => {
      return res.json();
    });

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
