import { privateApis } from '../../api';
import requestStationAndLine from '../../api/requestStationAndLine';
import { UNAUTHENTICATED_LINK } from '../../constants/link';
import LOCAL_STORAGE_KEY from '../../constants/localStorage';
import { CONFIRM_MESSAGE, SNACKBAR_MESSAGE } from '../../constants/message';
import Component from '../../core/Component';
import ExpiredTokenError from '../../error/ExpiredTokenError';
import { $ } from '../../utils/DOM';
import { showSnackbar } from '../../utils/snackbar';
import AddModal from './AddModal';
import EditModal from './EditModal';
import mainTemplate from './template';
import Router from '../../Router';

class Line extends Component {
  constructor({ parentNode, state, props: { setIsLogin } }) {
    super({
      parentNode,
      state,
    });

    this.childComponents = {
      addModal: new AddModal({
        parentNode,
        modalName: 'line-add',
        props: {
          setIsLogin,
          updateSubwayState: this.updateSubwayState.bind(this),
        },
      }),
      editModal: new EditModal({
        parentNode,
        modalName: 'line-edit',
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
    $('.js-line-item__create').addEventListener('click', () => {
      this.childComponents.addModal.show();
      this.childComponents.addModal.clearForm();
    });

    $('.js-line-list').addEventListener('click', async ({ target }) => {
      if (target.classList.contains('js-line-item__edit')) {
        this.childComponents.editModal.show();

        const id = target.closest('.js-line-item').dataset.id;
        this.childComponents.editModal.setTarget(id);
      }

      if (target.classList.contains('js-line-item__delete')) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const id = target.closest('.js-line-item').dataset.id;
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);

        try {
          await privateApis.lines.delete({
            lineId: id,
            accessToken,
          });
          showSnackbar(SNACKBAR_MESSAGE.LINE.DELETE.SUCCESS);
          await this.updateSubwayState();
        } catch (error) {
          if (error instanceof ExpiredTokenError) {
            this.setIsLogin(false);
            Router.goPage(UNAUTHENTICATED_LINK.LOGIN);
          }
          console.error(error.message);
          showSnackbar(error.message || SNACKBAR_MESSAGE.LINE.DELETE.SUCCESS);
        }
      }
    });
  }

  async updateSubwayState() {
    this.setState(await requestStationAndLine());
  }
}

export default Line;
