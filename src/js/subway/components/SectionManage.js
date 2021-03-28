import { getFromSessionStorage, $, $$, show } from '../../@shared/utils';
import { DOM } from '../constants/dom';
import { MESSAGE, NAME_LENGTH, ROUTE, SESSION_KEY, STATE_KEY, SUBMIT_TYPE } from '../constants/constants';
import { hideModal, isValidName, showModal, stationManageAPI } from '../utils';
import { mainElements, modalElements, stationInfo, stationList } from '../views';

export class SectionManage {
  constructor(props) {
    this.props = props;
    this.submitType = null;
    // this.setup();
    this.bindEvent();
  }

  bindEvent() {
    DOM.SECTION.MAIN.ADD_MODAL_BUTTON.addEventListener('click', this.handleAddButton.bind(this));
  }

  handleAddButton() {
    this.submitType = SUBMIT_TYPE.ADD;
    DOM.SECTION.MODAL.MSG.innerText = '';
    show(...DOM.SECTION.MODAL.NON_MODIFIABLE);
    showModal(DOM.CONTAINER.MODAL);
  }
}
