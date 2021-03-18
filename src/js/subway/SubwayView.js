import { $ } from '../utils/DOM.js';
import { headerTemplate } from './templates/header.js';

class SubwayView {
  constructor() {}
  init() {
    $('nav').innerHTML = headerTemplate;
  }
}
export default SubwayView;
