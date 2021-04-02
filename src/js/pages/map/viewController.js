import { getTransferLines } from '../../services/section';
import { $ } from '../../utils/dom';
import { mapListItems, transferLinesTemplate } from './template';

export const updateMapList = sections => {
  $('.js-map-list').innerHTML = mapListItems(sections);
};

export const updateTransferLine = (sections, currentLineId) => {
  sections.forEach(({ upStation }) => {
    const transferLines = getTransferLines(upStation.id, currentLineId);

    if (transferLines.length > 1) {
      $(`.js-map-list-item[data-station-id="${upStation.id}"] .js-transfer-lines`).innerHTML = transferLinesTemplate(
        transferLines
      );

      toggleTransferCircle($(`.js-map-list-item[data-station-id="${upStation.id}"] .js-map-list-item-circle`));
    }
  });
};

export const toggleTransferCircle = $target => {
  $target.classList.toggle('transfer-available');
};

export const setMapLineColor = color => {
  $('.js-map-list').style.setProperty('--line-color', `var(--${color})`);
};

export const highlightStation = stationId => {
  const $target = $(`.js-map-list-item[data-station-id="${stationId}"] .station-name`);

  if ($target.classList.contains('highlight')) {
    $target.classList.remove('highlight');
  }

  $target.classList.add('highlight');
};
