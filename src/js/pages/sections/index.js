import { $ } from '../../utils/dom';
import sectionsPageTemplate from './template';

const mountSections = () => {
  $('#route-container').innerHTML = sectionsPageTemplate;
};

export default mountSections;
