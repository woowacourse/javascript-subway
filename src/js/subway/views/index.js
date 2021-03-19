import { stateManager } from '../../@shared/models/StateManager.js';
import { root } from './templates/root.js';
import { signIn } from './templates/signIn.js';
import { signUp } from './templates/signUp.js';
import { stationManage } from './templates/stationManage.js';
import { lineManage } from './templates/lineManage.js';
import { sectionManage } from './templates/sectionManage.js';
import { STATE_KEY, ROUTE } from '../constants/constants.js';
import { parseToElements } from '../../@shared/utils/dom.js';
import { $ } from '../../@shared/utils';

export { menuButtons } from './templates/menuButtons.js';
export { lineAddModal } from './templates/lineAddModal.js';
export { sectionAddModal } from './templates/sectionAddModal.js';
// export {} from './templates/mapDisplay.js';
// export {} from './templates/pathFind.js';

export const contentElements = {
  [ROUTE.ROOT]: $('#content', parseToElements(root)),
  [ROUTE.SIGNIN]: $('#content', parseToElements(signIn)),
  [ROUTE.SIGNUP]: $('#content', parseToElements(signUp)),
  // [ROUTE.STATIONS]: parseToElements(stationManage),
  // [ROUTE.LINES]: parseToElements(lineManage),
  // [ROUTE.SECTIONS]: parseToElements(sectionManage),
  //   map: mapDisplay
  //   search:pathFind
};
