import { $ } from '../../utils/DOM';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/message';
import { mainTemplate } from './template';
import Component from '../../core/Component';
import EditModal from './EditModal';
import { privateApis } from '../../api';

class Station extends Component {
  constructor({ parentNode, state }) {
    super({
      parentNode,
      childComponents: {
        editModal: new EditModal({
          parentNode,
          modalKey: 'station-edit',
        }),
      },
      state,
    });

    this.setChildProps('editModal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate({ state: this.state });
  }

  addEventListeners() {
    $('#create-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = e.target['station-name'].value;
      const accessToken = localStorage.getItem('accessToken') || '';

      await this.createItem(name, accessToken);
    });

    $('.js-station-list').addEventListener('click', async ({ target }) => {
      if (target.classList.contains('js-station-item__edit')) {
        this.childComponents.editModal.setTargetId(
          target.closest('.js-station-item').dataset.id
        );
        this.childComponents.editModal.show();
      }

      if (target.classList.contains('js-station-item__delete')) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const { id } = target.closest('.js-station-item').dataset;
        const accessToken = localStorage.getItem('accessToken') || '';

        await this.deleteItem(id, accessToken);
      }
    });
  }

  async createItem(name, accessToken) {
    try {
      const body = { name };
      const response = await privateApis.Stations.post({ accessToken, body });

      if (response.status === 401) {
        throw Error(ERROR_MESSAGE.INVALID_TOKEN);
      }

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

      if (response.status === 401) {
        throw Error(ERROR_MESSAGE.INVALID_TOKEN);
      }

      if (!response.ok) throw Error(await response.text());

      this.updateSubwayState();
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateSubwayState() {
    const accessToken = localStorage.getItem('accessToken') || '';

    const [stations, lines] = await Promise.all([
      (await privateApis.Stations.get({ accessToken })).json(),
      (await privateApis.Lines.get({ accessToken })).json(),
    ]);

    this.setState({ stations, lines });
  }
}

export default Station;
