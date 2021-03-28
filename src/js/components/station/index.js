import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
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
      this.subwayState,
      this.updateSubwayState.bind(this)
    );
  }

  render() {
    const { stations } = this.subwayState;
    this.parentNode.innerHTML = mainTemplate(stations);
  }

  addEventListeners() {
    $('#create-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = e.target['station-name'].value;
      const accessToken = this.stateManagers.accessToken.getToken();

      await this.createItem(name, accessToken);
    });

    $('.js-station-list').addEventListener('click', async ({ target }) => {
      if (target.classList.contains('js-station-item__edit')) {
        this.modal.setTargetId(target.closest('.js-station-item').dataset.id);
        this.modal.show();
      }

      if (target.classList.contains('js-station-item__delete')) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const { id } = target.closest('.js-station-item').dataset;
        const accessToken = this.stateManagers.accessToken.getToken();

        await this.deleteItem(id, accessToken);
      }
    });
  }

  async fetchGetItemList() {
    const accessToken = this.stateManagers.accessToken.getToken();
    try {
      const params = getFetchParams({ path: PATH.STATIONS, accessToken });
      const response = await request.get(params);

      if (!response.ok) throw Error(await response.text());

      const itemList = await response.json();
      return itemList;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  async createItem(name, accessToken) {
    try {
      const params = getFetchParams({
        path: PATH.STATIONS,
        body: { name },
        accessToken,
      });
      const response = await request.post(params);

      if (!response.ok) throw Error(await response.text());

      this.updateSubwayState();
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteItem(id, accessToken) {
    try {
      const params = getFetchParams({
        path: `${PATH.STATIONS}/${id}`,
        accessToken,
      });

      const response = await request.delete(params);

      if (!response.ok) throw Error(await response.text());

      this.updateSubwayState();
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default Station;
