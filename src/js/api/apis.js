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

export default getSubwayState;
