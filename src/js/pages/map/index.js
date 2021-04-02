import store from '../../store';
import { $ } from '../../utils/dom';
import handleClickTransferLine from './eventHandlers/handleClickTransferLine';
import handleSelectLine from './eventHandlers/handleSelectLine';
import mapPageTemplate from './template';

const mountMap = () => {
  $('#route-container').innerHTML = mapPageTemplate(store.line.get());

  $('#line-select').addEventListener('change', handleSelectLine);
  $('.js-map-list').addEventListener('click', handleClickTransferLine);
};

export default mountMap;
