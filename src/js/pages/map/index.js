import store from '../../store';
import { $ } from '../../utils/dom';
import handleSelectLine from './eventHandlers/handleSelectLine';
import mapPageTemplate from './template';

const mountMap = () => {
  $('#route-container').innerHTML = mapPageTemplate(store.line.get());

  $('#line-select').addEventListener('change', handleSelectLine);
};

export default mountMap;
