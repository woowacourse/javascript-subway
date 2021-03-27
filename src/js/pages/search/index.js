import searchPageTemplate from './template';
import { $ } from '../../utils/dom';

const mountSearch = () => {
  $('#route-container').innerHTML = searchPageTemplate;
};

export default mountSearch;
