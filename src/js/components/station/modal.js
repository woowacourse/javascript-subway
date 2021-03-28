import getFetchParams from '../../api/getFetchParams.js';
import { PATH } from '../../constants/url.js';
import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
import request from '../../utils/request.js';
import { stationModal } from './template/modal.js';

class Modal extends ModalComponent {
  // 파라미터가 너무 많아서 분리가 필요해보임
  constructor(parentNode, stateManagers, subwayState, updateSubwayState) {
    super(parentNode, stateManagers, subwayState, updateSubwayState);
  }

  render() {
    this.parentNode.innerHTML = stationModal();
  }

  fillTargetInForm() {
    const { name } = this.subwayState.stations.find(
      ({ id }) => id === targetId
    );
    $('#subway-station-name').value = name;
  }

  addEventListeners() {
    $('#edit-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const { id } = this.dataset;
      // TODO: 현재 이름과 새로 수정할 이름이 같은경우 예외처리
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
      await this.updateSubwayState();
    } catch (error) {
      // TODO: 스낵바
      console.error(error.message);
    }
  }
}

export default Modal;
