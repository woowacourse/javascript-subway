import { ROUTE } from '../constants/constants';
import { $, parseToElements } from '../../@shared/utils';

import { root } from './templates/main/root';
import { signIn } from './templates/main/signIn';
import { signUp } from './templates/main/signUp';
import { stationManage } from './templates/main/stationManage';
import { lineManage } from './templates/main/lineManage';
import { sectionManage } from './templates/main/sectionManage';
export { stationInfo, stationList } from './templates/main/stationManage';
export { lineInfo, lineList } from './templates/main/lineManage';
export { sectionInfo, sectionList } from './templates/main/sectionManage';

import { stationModify } from './templates/modal/stationModify';
import { lineAddModify } from './templates/modal/lineAddModify';
import { sectionAddModify } from './templates/modal/sectionAddModify';

export { menuButtons } from './templates/ui/menuButtons';

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
