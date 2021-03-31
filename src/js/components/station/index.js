import { $ } from '../../utils/DOM.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import { mainTemplate } from './template/main.js';
import Component from '../../core/Component.js';
import Modal from './modal.js';
import getSubwayState, { privateApis, publicApis } from '../../api/apis.js';

class Station extends Component {
  constructor(parentNode, stateManagers) {
    super(
      parentNode,
      stateManagers,
      { modal: new Modal($('.js-modal'), stateManagers) },
      {
        stations: [],
        lines: [],
      }
    );

    this.setChildProps('modal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });
  }

  renderSelf() {
    const stations = this.state.stations;
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

  async createItem(name, accessToken) {
    try {
      const body = { name };
      const response = await privateApis.Stations.post({ accessToken, body });

      if (!response.ok) throw Error(await response.text());

      this.updateSubwayState();
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteItem(stationId, accessToken) {
    try {
      const response = await privateApis.Stations.delete({
        stationId,
        accessToken,
      });

      if (!response.ok) throw Error(await response.text());

      this.updateSubwayState();
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateSubwayState() {
    const accessToken = this.stateManagers.accessToken.getToken();

    const [stations, lines] = await Promise.all([
      (await privateApis.Stations.get({ accessToken })).json(),
      (await privateApis.Lines.get({ accessToken })).json(),
    ]);

    this.setState({ stations, lines });
  }
}

export default Station;
