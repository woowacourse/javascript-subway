import { ELEMENT } from '../../utils/constants';
import { $$ } from '../../utils/dom';

export const setStationListStyle = () => {
  $$(`.${ELEMENT.STATION_LIST_ITEM}`).forEach(($stationList) => {
    if ($stationList.nextElementSibling.classList.contains(ELEMENT.MAP_LINE_NAME)) return;

    const suitableWidth = $stationList.querySelector(`.${ELEMENT.MAP_STATION_NAME}`).offsetWidth + 20;
    const $sectionConnectLine = $stationList.querySelector(`.${ELEMENT.SECTION_LINE}`);

    $stationList.style.marginRight = `${suitableWidth}px`;
    $sectionConnectLine.style.width = `${suitableWidth + $stationList.offsetWidth}px`;
  });
};
