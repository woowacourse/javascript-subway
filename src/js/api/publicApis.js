import request from '../utils/request';
import HEADERS from '../constants/headers';
import { PATH } from '../constants/url';
import { BASE_URL } from '../constants/url';
import ValidationError from '../error/ValidationError';
import { ERROR_MESSAGE, INVALID_MESSAGE } from '../constants/message';

const publicApis = {
  me: async (accessToken) => {
    const response = await request.get({
      url: BASE_URL + PATH.MEMBERS.ME,
      options: {
        headers: {
          ...HEADERS.CONTENT_TYPE.JSON,
          ...HEADERS.AUTHORIZATION.BEARER(accessToken),
        },
      },
    });

    if (!response.ok) throw Error(ERROR_MESSAGE.INVALID_TOKEN);
  },

  login: async (email, password) => {
    const body = {
      email,
      password,
    };
    const response = await request.post({
      url: BASE_URL + PATH.MEMBERS.LOGIN,
      options: {
        headers: {
          ...HEADERS.CONTENT_TYPE.JSON,
        },
        body: JSON.stringify(body),
      },
    });

    if (response.status === 400) {
      throw new ValidationError(INVALID_MESSAGE.LOGIN.FAILED);
    }

    if (!response.ok) throw Error(response.message);

    const { accessToken } = await response.json();

    return accessToken;
  },

  signup: async (name, email, password) => {
    const body = { name, email, password };
    const response = await request.post({
      url: BASE_URL + PATH.MEMBERS.SIGNUP,
      options: {
        headers: {
          ...HEADERS.CONTENT_TYPE.JSON,
        },
        body: JSON.stringify(body),
      },
    });

    if (!response.ok) throw Error(response.message);
  },

  checkDuplicatedEmail: async (emailQuery) => {
    const response = await request.get({
      url: BASE_URL + PATH.MEMBERS.CHECK + emailQuery,
      options: {
        headers: {
          ...HEADERS.CONTENT_TYPE.JSON,
        },
      },
    });

    if (response.status === 422) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.EMAIL.DUPLICATED);
    }

    if (!response.ok) throw Error(response.message);
  },
};

export default publicApis;
