import Apis from '../../api';
import { CONFIRM_MESSAGE, SNACKBAR_MESSAGE } from '../../constants/message';
import Component from '../../core/Component';
import { $ } from '../../utils/DOM';
import { showSnackbar } from '../../utils/snackbar';
import AddModal from './AddModal';
import EditModal from './EditModal';
import mainTemplate from './template';
import Router from '../../Router';

class Line extends Component {
  constructor({ parentNode, state }) {
    super({
      parentNode,
      state,
    });

    this.childComponents = {
      addModal: new AddModal({
        parentNode,
        modalName: 'line-add',
        props: {
          updateSubwayState: this.updateSubwayState.bind(this),
        },
      }),
      editModal: new EditModal({
        parentNode,
        modalName: 'line-edit',
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

        try {
          await Apis.lines.delete({
            lineId: id,
          });
          await this.updateSubwayState();
        } catch (error) {
          if (error instanceof HTTPError) {
            error.handleError();
          }

          console.error(error.message);
        }
      }
    });
  }

  async updateSubwayState() {
    this.setState(await Apis.getStationAndLine());
  }
}

export default Line;
