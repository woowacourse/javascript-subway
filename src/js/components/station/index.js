import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import { mainTemplate } from './template/main.js';
import request from '../../utils/request.js';
import FetchComponent from '../../core/FetchComponent.js';
import getFetchParams from '../../api/getFetchParams.js';
import Modal from './modal.js';
class Station extends FetchComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);

    this.modal = new Modal(
      $('.js-modal'),
      this.stateManagers,
      this.update.bind(this)
    );
  }

  render(itemList = []) {
    this.parentNode.innerHTML = mainTemplate(itemList);
  }

  addEventListeners() {
    this.parentNode.addEventListener('click', ({ target }) => {
      if (target.classList.contains('js-station-item__edit')) {
        this.modal.setDataset(target.closest('.js-station-item').dataset);
        this.modal.show();
      }

      if (target.classList.contains('js-station-item__delete')) {
        // delete하는 로직이 들어가면 됨
      }
    });
  }

  async fetchGetItemList() {
    const accessToken = this.stateManagers.accessToken.getToken();
    try {
      const response = await request.get(
        getFetchParams({ path: PATH.STATIONS, accessToken })
      );
      if (!response.ok) throw Error(response.message);

      const itemList = await response.json();
      return itemList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default Station;
