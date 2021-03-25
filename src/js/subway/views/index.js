import { root } from './templates/root';
import { signIn } from './templates/signIn';
import { signUp } from './templates/signUp';
import { stationManage } from './templates/stationManage';
import { lineManage } from './templates/lineManage';
import { sectionManage } from './templates/sectionManage';

import { MODAL_TYPE, ROUTE } from '../constants/constants';
import { $, parseToElements } from '../../@shared/utils';
import { stationModify } from './templates/stationModify';

export { stationInfo, stationList } from './templates/stationManage';
export { menuButtons } from './templates/menuButtons';
export { lineAdd } from './templates/lineAdd';
export { sectionAddModal } from './templates/sectionAddModal';

export const mainElements = {
  [ROUTE.ROOT]: $('#main-content', parseToElements(root)),
  [ROUTE.SIGNIN]: $('#main-content', parseToElements(signIn)),
  [ROUTE.SIGNUP]: $('#main-content', parseToElements(signUp)),
  [ROUTE.STATIONS]: $('#main-content', parseToElements(stationManage)),
  [ROUTE.LINES]: $('#main-content', parseToElements(lineManage)),
  [ROUTE.SECTIONS]: $('#main-content', parseToElements(sectionManage)),
};

export const modalElements = {
  [MODAL_TYPE.STATION_MODIFY]: $('#modal-content', parseToElements(stationModify)),
};
