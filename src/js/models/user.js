import jwtToken from '../jwtToken.js';
import StationManager from './StationManager.js';

const user = {
  authorization: jwtToken.getToken(),
  name: '',
  email: '',
  stationManager: new StationManager(),
  lineManager: null,
};

export default user;
