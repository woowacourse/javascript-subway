import getFetchParams from '../../api/getFetchParams.js';
import { PATH } from '../../constants/url.js';
import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
import request from '../../utils/request.js';
import { stationModal } from './template/modal.js';

class Modal extends ModalComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
  }

  renderSelf() {
    this.parentNode.innerHTML = stationModal();
  }

  fillTargetInForm() {
    const { stations } = this.stateManagers.subwayState.getSubwayState();
    const { name } = stations.find(({ id }) => id === Number(this.targetId));
    $('#subway-station-name').value = name;
  }

  addEventListeners() {
    $('.modal-close').addEventListener('click', () => this.hide());

    $('#edit-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = this.targetId;
      const newName = e.target['subway-station-name'].value;
      const accessToken = this.stateManagers.accessToken.getToken();

      await this.updateItem(id, newName, accessToken);
    });
  }

  async updateItem(id, name, accessToken) {
    try {
      const params = getFetchParams({
        path: `${PATH.STATIONS}/${id}`,
        body: { name },
        accessToken,
      });
      const response = await request.put(params);

      if (!response.ok) throw Error(await response.text());

      this.hide();
      this.stateManagers.subwayState.updateSubwayState(accessToken);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default Modal;
