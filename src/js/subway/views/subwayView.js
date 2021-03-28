import { MESSAGE } from '../constants';

export const subwayView = {
  renderRoot: ($target, signedUserName) => {
    $target.innerHTML = signedUserName ? MESSAGE.ROOT_GREETING(signedUserName) : MESSAGE.SIGNIN.REQUIRED;
  },
};
