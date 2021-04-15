import { $ } from '../../utils/DOM';
import { CONFIRM_MESSAGE } from '../../constants/message';
import { mainTemplate } from './template';
import Component from '../../core/Component';
import EditModal from './EditModal';
import Apis from '../../api';
import { SNACKBAR_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils/snackbar';
import HTTPError from '../../error/HTTPError';

class Station extends Component {
  constructor({ parentNode, state }) {
    super({
      parentNode,
      state,
    });

    this.childComponents = {
      editModal: new EditModal({
        parentNode,
        modalName: 'station-edit',
        props: {
          updateSubwayState: this.updateSubwayState.bind(this),
        },
      }),
    };
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate({ state: this.state });
  }

  addEventListeners() {
    $('#create-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = e.target['station-name'].value;

      await this.createItem(name);
    });

    $('.js-station-list').addEventListener('click', async ({ target }) => {
      if (target.classList.contains('js-station-item__edit')) {
        this.childComponents.editModal.setTarget(
          target.closest('.js-station-item').dataset.id
        );
        this.childComponents.editModal.show();
      }

      if (target.classList.contains('js-station-item__delete')) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const { id } = target.closest('.js-station-item').dataset;

        await this.deleteItem(id);
      }
    });
  }

  async createItem(name) {
    const body = { name };
    try {
      await Apis.stations.post({ body });

      await this.updateSubwayState();
    } catch (error) {
      if (error instanceof HTTPError) {
        error.handleError();
      }

      console.error(error.message);
    }
  }

  async deleteItem(stationId, accessToken) {
    try {
      await Apis.stations.delete({
        stationId,
        accessToken,
      });

      await this.updateSubwayState();
    } catch (error) {
      if (error instanceof HTTPError) {
        error.handleError();
      }

      console.error(error.message);
    }
  }

  async updateSubwayState() {
    this.setState(await Apis.getStationAndLine());
  }
}

export default Station;
