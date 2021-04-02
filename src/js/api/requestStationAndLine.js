import LOCAL_STORAGE_KEY from '../constants/localStorage';
import privateApis from './privateApis';

const requestStationAndLine = async () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);

  const [stations, lines] = await Promise.all([
    privateApis.stations.get({ accessToken }),
    privateApis.lines.get({ accessToken }),
  ]);

  return { stations, lines };
};

export default requestStationAndLine;
