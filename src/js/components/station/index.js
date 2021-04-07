import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import { mainTemplate } from './template/main.js';
import request from '../../utils/request.js';
import Component from '../../core/Component.js';
import getFetchParams from '../../api/getFetchParams.js';
import Modal from './modal.js';
import getSubwayState from '../../api/apis.js';

class Station extends Component {
  constructor(parentNode, stateManagers) {
    super(
      parentNode,
      stateManagers,
      { modal: new Modal($('.js-modal'), stateManagers) },
      { stations: [], lines: [] }
    );

    this.setChildProps('modal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate(this.state.stations);
  }

  addEventListeners() {
    this.createStationEvent();
    this.editOrDeleteStationEvent();
  }

  createStationEvent() {
    $('#create-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = e.target['station-name'].value;
      const accessToken = this.stateManagers.accessToken.getToken();

      await this.createItem(name, accessToken);
      e.target['station-name'].focus();
    });
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
      // TODO: 생성되지 않았을 때 ALERT 띄워주기
      console.error(error.message);
    }
  }

  editOrDeleteStationEvent() {
    $('.js-station-list').addEventListener('click', async ({ target }) => {
      if (target.classList.contains('js-station-item__edit')) {
        this.childComponents.modal.setTargetId(
          target.closest('.js-station-item').dataset.id
        );
        this.childComponents.modal.show();
      }

      if (target.classList.contains('js-station-item__delete')) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const { id } = target.closest('.js-station-item').dataset;
        const accessToken = this.stateManagers.accessToken.getToken();

        await this.deleteItem(id, accessToken);
      }
    });
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
      // TODO: 잘못된 내용에 대해 ALERT 띄워주기
      alert(error.message);
      console.error(error.message);
    }
  }

  async updateSubwayState() {
    const { stations, lines } = await getSubwayState(
      this.stateManagers.accessToken.getToken()
    );
    this.setState({ stations, lines });
  }
}

export default Station;
