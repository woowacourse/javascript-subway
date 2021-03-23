import { requestCheckLogin } from '../services/auth';
import accessToken from './accessToken';
import station from './station';

const initStore = async () => {
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
  await station.init();
};

export default initStore;
