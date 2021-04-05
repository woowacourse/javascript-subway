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
import { MapDisplay } from './templates/mapDIsplay';
import { SELECTOR } from '../constants';

export { menuButtons } from './templates/menuButtons';
export { stationInfo, stationList } from './templates/stationManage';
export { lineInfo, lineList } from './templates/lineManage';
export { sectionInfo, sectionList } from './templates/sectionManage';

export const mainElements = {
  [ROUTE.ROOT]: $(`#${SELECTOR.CONTENT.MAIN}`, parseToElements(root)),
  [ROUTE.SIGNIN]: $(`#${SELECTOR.CONTENT.MAIN}`, parseToElements(signIn)),
  [ROUTE.SIGNUP]: $(`#${SELECTOR.CONTENT.MAIN}`, parseToElements(signUp)),
  [ROUTE.STATIONS]: $(`#${SELECTOR.CONTENT.MAIN}`, parseToElements(stationManage)),
  [ROUTE.LINES]: $(`#${SELECTOR.CONTENT.MAIN}`, parseToElements(lineManage)),
  [ROUTE.SECTIONS]: $(`#${SELECTOR.CONTENT.MAIN}`, parseToElements(sectionManage)),
  [ROUTE.MAP]: $(`#${SELECTOR.CONTENT.MAIN}`, parseToElements(MapDisplay)),
};

export const modalElements = {
  [ROUTE.STATIONS]: $(`#${SELECTOR.CONTENT.MODAL}`, parseToElements(stationModify)),
  [ROUTE.LINES]: $(`#${SELECTOR.CONTENT.MODAL}`, parseToElements(lineAddModify)),
  [ROUTE.SECTIONS]: $(`#${SELECTOR.CONTENT.MODAL}`, parseToElements(sectionAddModify)),
};

export { subwayView } from './subwayView';
