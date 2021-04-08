import { PATH } from '../constants/url.js';
import request from '../utils/request.js';
import getFetchParams from './getFetchParams.js';

const getSubwayState = async (accessToken) => {
  const [stations, lines] = await Promise.all([
    fetchGetItemList(PATH.STATIONS, accessToken),
    fetchGetItemList(PATH.LINES, accessToken),
  ]);

  return { stations, lines };
};

const fetchGetItemList = async (path, accessToken) => {
  try {
    const params = getFetchParams({ path, accessToken });
    const response = await request.get(params);

    if (!response.ok) throw Error(await response.text());

    const itemList = await response.json();

    return itemList;
  } catch (error) {
    console.error(error.message);

    return [];
  }
};

const login = async function (email, password) {
  const params = getFetchParams({
    path: PATH.MEMBERS.LOGIN,
    body: { email, password },
  });
  const response = await request.post(params);

  if (response.status === 400) {
    throw new ValidationError(INVALID_MESSAGE.LOGIN.FAILED);
  }

  if (!response.ok) throw Error(response.message);

  const { accessToken } = await response.json();
  return accessToken;
};

const signup = async function (name, email, password) {
  const params = getFetchParams({
    path: PATH.MEMBERS.SIGNUP,
    body: { name, email, password },
  });

  const response = await request.post(params);
  if (!response.ok) throw Error(response.message);
};

export { getSubwayState, login, signup };
