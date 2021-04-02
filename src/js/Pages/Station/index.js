import { $ } from '../../utils/DOM';
import { CONFIRM_MESSAGE } from '../../constants/message';
import { mainTemplate } from './template';
import Component from '../../core/Component';
import EditModal from './EditModal';
import { privateApis } from '../../api';
import localStorageKey from '../../constants/localStorage';
import requestStationAndLine from '../../api/requestStationAndLine';
import ExpiredTokenError from '../../error/ExpiredTokenError';
import { UNAUTHENTICATED_LINK } from '../../constants/link';

class Station extends Component {
  constructor({ parentNode, state, props: { goPage, setIsLogin } }) {
    super({
      parentNode,
      state,
    });

    this.childComponents = {
      editModal: new EditModal({
        parentNode,
        modalKey: 'station-edit',
        props: {
          goPage,
          setIsLogin,
          updateSubwayState: this.updateSubwayState.bind(this),
        },
      }),
    };

    this.goPage = goPage;
    this.setIsLogin = setIsLogin;
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate({ state: this.state });
  }

  addEventListeners() {
    $('#create-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = e.target['station-name'].value;
      const accessToken =
        localStorage.getItem(localStorageKey.ACCESSTOKEN) || '';

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
        const accessToken =
          localStorage.getItem(localStorageKey.ACCESSTOKEN) || '';

        await this.deleteItem(id, accessToken);
      }
    });
  }

  async createItem(name, accessToken) {
    const body = { name };
    try {
      await privateApis.stations.post({ accessToken, body });
      this.updateSubwayState();
    } catch (error) {
      if (error instanceof ExpiredTokenError) {
        this.setIsLogin(false);
        this.goPage(UNAUTHENTICATED_LINK.LOGIN);
      }

      console.error(error.message);
    }
  }

  async deleteItem(stationId, accessToken) {
    try {
      await privateApis.stations.delete({
        stationId,
        accessToken,
      });

      this.updateSubwayState();
    } catch (error) {
      if (error instanceof ExpiredTokenError) {
        this.setIsLogin(false);
        this.goPage(UNAUTHENTICATED_LINK.LOGIN);
      }

      console.error(error.message);
    }
  }

  async updateSubwayState() {
    this.setState(await requestStationAndLine());
  }
}

export default Station;
