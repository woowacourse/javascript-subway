import { $ } from '../../../utils/dom';

const handleClickTransferLine = event => {
  if (!event.target.classList.contains('js-transfer-line-button')) return;

  const lineId = event.target.dataset.lineId;
  const stationId = event.target.closest('.js-map-list-item').dataset.stationId;

  $('#line-select').value = lineId;
  $('#line-select').dispatchEvent(new CustomEvent('change', { detail: { stationId } }));
};

export default handleClickTransferLine;
