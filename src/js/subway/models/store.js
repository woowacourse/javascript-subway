import { State } from '../../@shared/models/State';
import { Lines } from './lines';
import { Stations } from './stations';

export const store = {
  signedUserName: new State(),
  route: new State(),
  stations: new Stations([]),
  lines: new Lines([]),
};
