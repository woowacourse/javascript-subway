import { stateManager } from '../../@shared/models/StateManager';
import { getFromSessionStorage, $, $$, show } from '../../@shared/utils';
import { MESSAGE, NAME_LENGTH, ROUTE, SESSION_KEY, STATE_KEY, SUBMIT_TYPE } from '../constants/constants';
import { hideModal, isValidName, showModal, stationManageAPI } from '../utils';
import { mainElements, modalElements, stationInfo, stationList } from '../views';

export class SectionManage {
  constructor(props) {
    this.$mainContent = mainElements[ROUTE.SECTIONS];
    this.$modalContent = modalElements[ROUTE.SECTIONS];
    this.props = props;
    this.submitType = null;
    // this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$sectionAddButton = $('#section-add-modal-button', this.$mainContent);
    this.$$sectionModal = {
      $form: $('#section-form', this.$modalContent),
      $upStationSelector: $('#up-station', this.$modalContent),
      $downStationSelector: $('#down-station', this.$modalContent),
      $distanceInput: $('#distance', this.$modalContent),
      $durationInput: $('#duration', this.$modalContent),
      $submitButton: $('#section-submit-button', this.$modalContent),
      $failMessage: $('#fail-message-box', this.$modalContent),
    };
    this.$$nonModifiable = $$('.js-non-modifiable', this.$modalContent);
  }

  bindEvent() {
    this.$sectionAddButton.addEventListener('click', this.handleAddButton.bind(this));
  }

  handleAddButton() {
    this.submitType = SUBMIT_TYPE.ADD;
    this.$$sectionModal.$failMessage.innerText = '';
    show(...this.$$nonModifiable);
    showModal(this.props.$modal);
  }
}
