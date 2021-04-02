import localStorageKey from '../constants/localStorage';
import privateApis from './privateApis';

const requestStationAndLine = async () => {
  const accessToken = localStorage.getItem(localStorageKey.ACCESSTOKEN) || '';

  const [stations, lines] = await Promise.all([
    privateApis.Stations.get({ accessToken }),
    privateApis.Lines.get({ accessToken }),
  ]);

  return { stations, lines };
};

export default requestStationAndLine;
