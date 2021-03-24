import jwtToken from '../jwtToken';
import StationManager from './StationManager';

const user = {
  authorization: jwtToken.getToken(),
  name: '',
  email: '',
  stationManager: new StationManager(),
  lineManager: null,
};

export default user;
