import { root } from './templates/root';
import { signIn } from './templates/signIn';
import { signUp } from './templates/signUp';
import { stationManage } from './templates/stationManage';
import { lineManage } from './templates/lineManage';
import { sectionManage } from './templates/sectionManage';

import { ROUTE } from '../constants/constants';
import { $, parseToElements } from '../../@shared/utils';
import { stationModify } from './templates/stationModify';
import { lineAddModify } from './templates/lineAddModify';
import { sectionAddModify } from './templates/sectionAddModify';

export { menuButtons } from './templates/menuButtons';
export { stationInfo, stationList } from './templates/stationManage';
export { lineInfo, lineList } from './templates/lineManage';
export { sectionInfo, sectionList } from './templates/sectionManage';

export const mainElements = {
  [ROUTE.ROOT]: $('#main-content', parseToElements(root)),
  [ROUTE.SIGNIN]: $('#main-content', parseToElements(signIn)),
  [ROUTE.SIGNUP]: $('#main-content', parseToElements(signUp)),
  [ROUTE.STATIONS]: $('#main-content', parseToElements(stationManage)),
  [ROUTE.LINES]: $('#main-content', parseToElements(lineManage)),
  [ROUTE.SECTIONS]: $('#main-content', parseToElements(sectionManage)),
};

export const modalElements = {
  [ROUTE.STATIONS]: $('#modal-content', parseToElements(stationModify)),
  [ROUTE.LINES]: $('#modal-content', parseToElements(lineAddModify)),
  [ROUTE.SECTIONS]: $('#modal-content', parseToElements(sectionAddModify)),
};

export { subwayView } from './subwayView';
