import { privateApis } from '../../api';
import requestStationAndLine from '../../api/requestStationAndLine';
import { UNAUTHENTICATED_LINK } from '../../constants/link';
import localStorageKey from '../../constants/localStorage';
import { CONFIRM_MESSAGE } from '../../constants/message';
import Component from '../../core/Component';
import ExpiredTokenError from '../../error/ExpiredTokenError';
import { $ } from '../../utils/DOM';
import AddModal from './AddModal';
import EditModal from './EditModal';
import mainTemplate from './template';

class Line extends Component {
  constructor({ parentNode, state, props: { goPage, setIsLogin } }) {
    super({
      parentNode,
      state,
    });

    this.childComponents = {
      addModal: new AddModal({
        parentNode,
        modalKey: 'line-add',
        props: {
          goPage,
          setIsLogin,
          updateSubwayState: this.updateSubwayState.bind(this),
        },
      }),
      editModal: new EditModal({
        parentNode,
        modalKey: 'line-edit',
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
        const accessToken =
          localStorage.getItem(localStorageKey.ACCESSTOKEN) || '';

        try {
          await privateApis.Lines.delete({
            lineId: id,
            accessToken,
          });
          await this.updateSubwayState();
        } catch (error) {
          if (error instanceof ExpiredTokenError) {
            this.setIsLogin(false);
            this.goPage(UNAUTHENTICATED_LINK.LOGIN);
          }
          console.error(error.message);
        }
      }
    });
  }

  async updateSubwayState() {
    this.setState(await requestStationAndLine());
  }
}
//생성을 하는 순간 private tab들은 App들은 access Token이 없음. 그래서 요청이 불가.

export default Line;
