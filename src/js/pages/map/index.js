import { $ } from '../../utils/dom';
import mapPageTemplate from './template';

const mountMap = () => {
  $('#route-container').innerHTML = mapPageTemplate;
};

export default mountMap;
