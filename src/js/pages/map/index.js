import store from '../../store';
import { $ } from '../../utils/dom';
import mapPageTemplate from './template';

const mountMap = () => {
  $('#route-container').innerHTML = mapPageTemplate(store.line.get());
  console.log(store.line.get());
};

export default mountMap;
