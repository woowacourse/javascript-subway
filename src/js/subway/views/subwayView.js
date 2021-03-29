import { DOM } from '../constants/dom';
import { MENU, MESSAGE, ROUTE, UP_STATION } from '../constants/constants';
import { lineList } from './templates/lineManage';
import { stationList } from './templates/stationManage';
import { linkButton, selectorOption } from '../../@shared/views';
import { mainElements, modalElements } from '.';
import { menuButtons } from './templates/menuButtons';

export const subwayView = {
  renderRoot: signedUserName => {
    DOM.ROOT.MAIN.MSG.innerHTML = signedUserName ? MESSAGE.ROOT_GREETING(signedUserName) : MESSAGE.SIGNIN.REQUIRED;
  },
  renderNavButtons: signedUserName => {
    DOM.CONTAINER.MENU.innerHTML = signedUserName ? menuButtons : '';
    DOM.CONTAINER.SIGN.innerHTML = signedUserName
      ? linkButton({ link: ROUTE.SIGNOUT, text: MENU.SIGNOUT })
      : linkButton({ link: ROUTE.SIGNIN, text: MENU.SIGNIN });
  },
  renderMain: route => {
    if (!mainElements[route]) return;
    DOM.CONTAINER.MAIN.innerHTML = '';
    DOM.CONTAINER.MAIN.appendChild(mainElements[route]);
  },
  renderModal: route => {
    if (!modalElements[route]) return;
    DOM.CONTAINER.MODAL.innerHTML = '';
    DOM.CONTAINER.MODAL.appendChild(modalElements[route]);
  },
  renderStationList: (stations = []) => {
    DOM.STATION.MAIN.LIST.innerHTML = stationList(stations);
  },
  renderStationOptions: (text, stations = []) => {
    const selector =
      text === UP_STATION //
        ? DOM.LINE.MODAL.UP_STATION_SELECTOR
        : DOM.LINE.MODAL.DOWN_STATION_SELECTOR;

    selector.innerHTML = selectorOption({ text, selected: true, disabled: true });
    selector.innerHTML += stations //
      .map(({ id: value, name: text }) => selectorOption({ value, text }))
      .join('');
  },
  renderLineList: lines => {
    DOM.LINE.MAIN.LIST.innerHTML = lineList(lines);
  },
};
