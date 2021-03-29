import { requestCheckLogin } from '../api/auth';
import { STORE } from '../constants/alertMessage';
import accessToken from './accessToken';
import line from './line';
import station from './station';

const store = {
  line,
  accessToken,
  station,
};

export const initStore = async () => {
  accessToken.init();

  if (!accessToken.get()) return;

  const isLogin = await requestCheckLogin();

  if (isLogin) {
    await initPrivateStore();
  } else {
    accessToken.clear();
  }
};

export const initPrivateStore = async () => {
  try {
    await station.init();
    await line.init();
  } catch (error) {
    alert(STORE.DATA_LOAD_FAILED);
  }
};

export default store;
