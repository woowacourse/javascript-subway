import jwtToken from '../jwtToken.js';
import LineManager from './LineManager.js';
import StationManager from './StationManager.js';

const user = {
  authorization: '',
  stationManager: new StationManager(),
  lineManager: new LineManager(),

  getAuthorization() {
    return this.authorization;
  },

  setAuthorization() {
    this.authorization = jwtToken.getToken();
  },

  resetAuthorization() {
    this.authorization = '';
  },
};

export default user;
