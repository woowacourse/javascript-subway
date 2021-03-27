import getFetchParams from '../../api/getFetchParams.js';
import { PATH } from '../../constants/url.js';
import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
import request from '../../utils/request.js';
import { stationModal } from './template/modal.js';

class Modal extends ModalComponent {
  constructor(parentNode, stateManagers, updateItemList) {
    super(parentNode, stateManagers, updateItemList);

    this.dataset = {};
  }

  render() {
    this.parentNode.innerHTML = stationModal();
  }

  fillDatasetInForm() {
    const { name } = this.dataset;
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
      // 질문: async함수 마지막에 호출하는 비동기 작업은 await를 걸어주어야할까요?
      await this.updateItemList();
    } catch (error) {
      // TODO: 스낵바
      console.error(error.message);
    }
  }
}

export default Modal;
