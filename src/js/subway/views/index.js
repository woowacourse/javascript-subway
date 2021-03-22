import { root } from './templates/root';
import { signIn } from './templates/signIn';
import { signUp } from './templates/signUp';
import { stationManage } from './templates/stationManage';
import { lineManage } from './templates/lineManage';
import { sectionManage } from './templates/sectionManage';

import { ROUTE } from '../constants/constants';
import { $, parseToElements } from '../../@shared/utils';

export { menuButtons } from './templates/menuButtons';
export { lineAddModal } from './templates/lineAddModal';
export { sectionAddModal } from './templates/sectionAddModal';

export const contentElements = {
  [ROUTE.ROOT]: $('#content', parseToElements(root)),
  [ROUTE.SIGNIN]: $('#content', parseToElements(signIn)),
  [ROUTE.SIGNUP]: $('#content', parseToElements(signUp)),
  [ROUTE.STATIONS]: $('#content', parseToElements(stationManage)),
  [ROUTE.LINES]: $('#content', parseToElements(lineManage)),
  [ROUTE.SECTIONS]: $('#content', parseToElements(sectionManage)),
};
