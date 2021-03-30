import { State } from '../../@shared/models/State';
import { STATE_KEY } from '../constants';
import { Lines } from './lines';
import { Stations } from './stations';

export const store = {
  signedUserName: new State(),
  route: new State(),
  stations: new Stations([]),
  lines: new Lines([]),
};

export const updateUserInfo = signedUserName => {
  store[STATE_KEY.SIGNED_USER_NAME].set(signedUserName);
  store[STATE_KEY.STATIONS].update();
  store[STATE_KEY.LINES].update();
};
