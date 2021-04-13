import { $ } from '../../utils/DOM';
import { CONFIRM_MESSAGE } from '../../constants/message';
import { mainTemplate } from './template';
import Component from '../../core/Component';
import EditModal from './EditModal';
import { privateApis } from '../../api';
import LOCAL_STORAGE_KEY from '../../constants/localStorage';
import requestStationAndLine from '../../api/requestStationAndLine';
import ExpiredTokenError from '../../error/ExpiredTokenError';
import { UNAUTHENTICATED_LINK } from '../../constants/link';
import { SNACKBAR_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils/snackbar';
import Router from '../../Router';

class Station extends Component {
  constructor({ parentNode, state, props: { setIsLogin } }) {
    super({
      parentNode,
      state,
    });

    this.childComponents = {
      editModal: new EditModal({
        parentNode,
        modalName: 'station-edit',
        props: {
          setIsLogin,
          updateSubwayState: this.updateSubwayState.bind(this),
        },
      }),
    };

    this.setIsLogin = setIsLogin;
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate({ state: this.state });
  }

  addEventListeners() {
    $('#create-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = e.target['station-name'].value;
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);

      await this.createItem(name, accessToken);
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
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);

        await this.deleteItem(id, accessToken);
      }
    });
  }

  async createItem(name, accessToken) {
    const body = { name };
    try {
      await privateApis.stations.post({ accessToken, body });

      await this.updateSubwayState();
      showSnackbar(SNACKBAR_MESSAGE.STATION.CREATE.SUCCESS);
    } catch (error) {
      if (error instanceof ExpiredTokenError) {
        this.setIsLogin(false);
        Router.goPage(UNAUTHENTICATED_LINK.LOGIN);
      }

      console.error(error.message);
      showSnackbar(error.message || SNACKBAR_MESSAGE.STATION.CREATE.FAIL);
    }
  }

  async deleteItem(stationId, accessToken) {
    try {
      await privateApis.stations.delete({
        stationId,
        accessToken,
      });

      showSnackbar(SNACKBAR_MESSAGE.STATION.DELETE.SUCCESS);
      await this.updateSubwayState();
    } catch (error) {
      if (error instanceof ExpiredTokenError) {
        this.setIsLogin(false);
        Router.goPage(UNAUTHENTICATED_LINK.LOGIN);
      }

      console.error(error.message);
      showSnackbar(error.message || SNACKBAR_MESSAGE.STATION.DELETE.FAIL);
    }
  }

  async updateSubwayState() {
    this.setState(await requestStationAndLine());
  }
}

export default Station;
