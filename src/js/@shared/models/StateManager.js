import { State } from './State';

export const stateManager = {
  isSigned: new State(false),
  route: new State(''),
};
