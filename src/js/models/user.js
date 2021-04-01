import { COOKIE_KEY } from '../constants/constants.js';
import jwtToken from '../jwtToken.js';
import LineManager from './LineManager.js';
import StationManager from './StationManager.js';

const user = {
  stationManager: new StationManager(),
  lineManager: new LineManager(),
};

export default user;
