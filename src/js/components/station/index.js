import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import { mainTemplate } from './template/main.js';
import request from '../../utils/fetch.js';
import FetchComponent from '../../core/FetchComponent.js';
import getFetchParams from '../../api/getFetchParams.js';
import Modal from './modal.js';
class Station extends FetchComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
    this.modal = new Modal($('.js-modal'), this.stateManagers);
  }

  render(itemList = []) {
    this.parentNode.innerHTML = mainTemplate(itemList);
  }

  addEventListeners() {
    $('.js-station-list').addEventListener('click', ({ target }) => {
      if (target.classList.contains('js-station-item__edit')) {
        const { id, name } = target.closest('.js-station-item').dataset;
        this.modal.show();
        // TODO:
        // edit하는 로직이 들어가면 됨
        // 1. modal이 뜸
        // 2. 역 이름을 수정
        // 3. 확인
        // 4. API 요청 -> Edit 완료
        // 5. Render
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
