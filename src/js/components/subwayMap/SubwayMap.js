import Component from '../../core/Component.js';
import { serviceAPI } from '../../service/serviceAPI.js';
import { LOGIN_REQUIRED_TEMPLATE } from '../../constants/index.js';
import { $ } from '../../utils/index.js';
import { subwayMapTemplate } from './template.js';

export default class SubwayMap extends Component {
  #token;
  constructor() {
    super();
    this.#token;
  }

  selectDOM() {}

  bindEvent() {}

  render(token = '', lineList) {
    $('main').innerHTML = token ? subwayMapTemplate(lineList) : LOGIN_REQUIRED_TEMPLATE;
  }

  async load(token = '') {
    const lineList = await serviceAPI.getLineList(token);

    this.#token = token;
    this.render(token, lineList);
  }
}
