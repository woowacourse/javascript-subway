import { DOM } from '../constants/dom';
import { MENU, MESSAGE, ROUTE } from '../constants';
import { lineList } from './templates/lineManage';
import { stationList } from './templates/stationManage';
import { linkButton, selectorOption } from '../../@shared/views';
import { mainElements, modalElements } from '.';
import { menuButtons } from './templates/menuButtons';
import { sectionList } from './templates/sectionManage';

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

  renderStationOptions: ($selector, defaultOption, stations = []) => {
    $selector.innerHTML = selectorOption({ option: defaultOption, selected: true, disabled: true });
    $selector.innerHTML += stations //
      .map(({ id: value, name: option }) => selectorOption({ value, option }))
      .join('');
  },

  renderLineList: lines => {
    DOM.LINE.MAIN.LIST.innerHTML = lineList(lines);
  },

  renderLineOptions: (lines = []) => {
    DOM.SECTION.MAIN.LINE_SELECTOR.innerHTML = selectorOption({
      option: MESSAGE.SECTION_MANAGE.LINE_DEFAULT_OPTION,
      selected: true,
      disabled: true,
    });
    DOM.SECTION.MAIN.LINE_SELECTOR.innerHTML += lines //
      .map(({ id: value, name: option }) => selectorOption({ value, option }))
      .join('');
  },

  renderSectionList: (stations = []) => {
    DOM.SECTION.MAIN.LIST.innerHTML = sectionList(stations);
  },

  fillLineColorBar: color => {
    const dot = DOM.SECTION.MAIN.LINE_COLOR_BAR;
    dot.classList.remove('hidden');
    if (dot.dataset.color) {
      dot.classList.remove(dot.dataset.color);
    }

    dot.dataset.color = color;
    dot.classList.add(color);
  },
};
