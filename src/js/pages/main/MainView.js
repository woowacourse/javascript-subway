import { $ } from '../../utils/DOM.js';
import subway_emoji from '../../../images/subway_emoji.png';
import { logoutButtonTemplate } from './templates/appNavbar.js';
import headerTemplate from './templates/header.js';

class MainView {
  async init() {
    $('#app-navbar').innerHTML = logoutButtonTemplate;
    $('#navigation').innerHTML = headerTemplate;
    $('#main').innerHTML = `<img src="${subway_emoji}" alt="subway-img">`;
  }

  resetView() {
    $('#app-navbar').innerHTML = '';
    $('#navigation').innerHTML = '';
  }
}

export default MainView;
