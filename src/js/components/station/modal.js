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

  setDataset(dataset) {
    this.dataset = dataset;
    this.fillDatasetInForm();
  }

  fillDatasetInForm() {
    const { name } = this.dataset;
    $('#subway-station-name').value = name;
  }

  addEventListeners() {
    $('#edit-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const { id } = this.dataset;
      const newName = e.target['subway-station-name'].value;

      // TODO: 현재 이름과 새로 수정할 이름이 같은경우 예외처리
      const accessToken = this.stateManagers.accessToken.getToken();
      try {
        const response = await request.put(
          getFetchParams({
            path: `${PATH.STATIONS}/${id}`,
            body: newName,
            accessToken,
          })
        );

        if (!response.ok) {
          throw Error(response.message);
        }
        // 모달 클로즈
        this.hide();
        // 질문: async함수 마지막에 호출하는 비동기 작업은 await를 걸어주어야할까요?
        await this.updateItemList(); // 10초
      } catch (error) {
        // TODO: 스낵바
        console.error(error);
      }
    });

    // 모든 역 조회

    // Station 리 렌더링
  }
}

export default Modal;
