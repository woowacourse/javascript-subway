import { $ } from '../../utils/dom';
import errorPageTemplate from './template';

const mountError = () => {
  $('#route-container').innerHTML = errorPageTemplate;
};

export default mountError;
