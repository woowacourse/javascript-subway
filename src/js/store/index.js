import accessToken from './accessToken';
import station from './station';

const initStore = async () => {
  accessToken.init();
  if (accessToken.get()) {
    await initPrivateStore();
  }
};

export const initPrivateStore = async () => {
  await station.init();
};

export default initStore;
