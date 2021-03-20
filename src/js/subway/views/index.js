import { root } from './templates/root';
import { signIn } from './templates/signIn';
import { signUp } from './templates/signUp';
import { stationManage } from './templates/stationManage';
import { lineManage } from './templates/lineManage';
import { sectionManage } from './templates/sectionManage';
import { STATE_KEY, ROUTE } from '../constants/constants';
import { parseToElements } from '../../@shared/utils/dom';
import { $ } from '../../@shared/utils';

export { menuButtons } from './templates/menuButtons';
export { lineAddModal } from './templates/lineAddModal';
export { sectionAddModal } from './templates/sectionAddModal';
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
