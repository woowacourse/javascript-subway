import jwtToken from '../jwtToken.js';
import LineManager from './LineManager.js';
import StationManager from './StationManager.js';

const user = {
  authorization: jwtToken.getToken(),
  name: '',
  email: '',
  stationManager: new StationManager(),
  lineManager: new LineManager(),
};

export default user;
