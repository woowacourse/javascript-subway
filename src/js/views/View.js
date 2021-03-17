import { $ } from '../utils/DOM.js';
import { headerTemplate } from '../pages/header.js';

class View {
  init() {
    $('header').innerHTML = headerTemplate;
  }
}

export default View;
