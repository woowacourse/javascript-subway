import { stateManager } from '../../@shared/models/StateManager.js';
import { root } from './templates/root.js';
import { signIn } from './templates/signIn.js';
import { signUp } from './templates/signUp.js';
import { stationManage } from './templates/stationManage.js';
import { lineManage } from './templates/lineManage.js';
import { sectionManage } from './templates/sectionManage.js';
import { STATE_KEY, ROUTE } from '../constants/constants.js';

export { menuButtons } from './templates/menuButtons.js';
export { lineAddModal } from './templates/lineAddModal.js';
export { sectionAddModal } from './templates/sectionAddModal.js';
// export {} from './templates/mapDisplay.js';
// export {} from './templates/pathFind.js';

export const mainTemplate = {
  [ROUTE.ROOT]: root(stateManager[STATE_KEY.IS_SIGNED].get()),
  [ROUTE.SIGNIN]: signIn,
  [ROUTE.SIGNUP]: signUp,
  [ROUTE.STATIONS]: stationManage,
  [ROUTE.LINES]: lineManage,
  [ROUTE.SECTIONS]: sectionManage,
  //   map: mapDisplay
  //   search:pathFind
};
