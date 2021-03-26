import { stateManager } from '../../@shared/models/StateManager';
import { getFromSessionStorage, $ } from '../../@shared/utils';
import { selectorOption } from '../../@shared/views';
import {
  DOWN_STATION,
  MESSAGE,
  NAME_LENGTH,
  ROUTE,
  SESSION_KEY,
  STATE_KEY,
  SUBMIT_TYPE,
  UP_STATION,
} from '../constants/constants';
import { hideModal, isValidName, lineManageAPI, showModal, stationManageAPI } from '../utils';
import { mainElements, modalElements } from '../views';
import { lineInfo, lineList } from '../views';

export class LineManage {
  constructor(props) {
    this.$mainContent = mainElements[ROUTE.LINES];
    this.$modalContent = modalElements[ROUTE.LINES];
    this.props = props;
    this.submitType = null;
    this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    stateManager[STATE_KEY.SIGNED_USER].subscribe(this.renderLineList.bind(this));
    stateManager[STATE_KEY.ROUTE].subscribe(this.renderStationOptions.bind(this));
  }

  async renderStationOptions(route) {
    if (route !== ROUTE.LINES) return;

    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      if (this.props.cache.stations.length === 0) {
        this.props.cache.stations = await stationManageAPI.getStations(accessToken);
      }

      this.$$lineModal.$upStationSelector.innerHTML = selectorOption({
        text: UP_STATION,
        selected: true,
        disabled: true,
      });
      this.$$lineModal.$upStationSelector.innerHTML += this.props.cache.stations
        .map(({ id: value, name: text }) => selectorOption({ value, text }))
        .join('');
      this.$$lineModal.$downStationSelector.innerHTML = selectorOption({
        text: DOWN_STATION,
        selected: true,
        disabled: true,
      });
      this.$$lineModal.$downStationSelector.innerHTML += this.props.cache.stations
        .map(({ id: value, name: text }) => selectorOption({ value, text }))
        .join('');
    } catch (error) {
      console.error(error.message);
    }
  }

  async renderLineList() {
    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      const lines = await lineManageAPI.getLines(accessToken);

      this.$lineList.innerHTML = lineList(lines);
    } catch (error) {
      console.error(error.message);
    }
  }

  selectDOM() {
    this.$lineAddButton = $('#line-add-modal-button', this.$mainContent);
    this.$lineList = $('#line-list', this.$mainContent);
    this.$$lineModal = {
      $form: $('#line-form', this.$modalContent),
      $nameInput: $('#line-name-input', this.$modalContent),
      $upStationSelector: $('#up-station', this.$modalContent),
      $downStationSelector: $('#down-station', this.$modalContent),
      $distanceInput: $('#distance', this.$modalContent),
      $durationInput: $('#duration', this.$modalContent),
      $colorInput: $('#line-color', this.$modalContent),
      $palette: $('#line-color-selector', this.$modalContent),
      $submitButton: $('#line-submit-button', this.$modalContent),
      $failMessage: $('#fail-message-box', this.$modalContent),
    };
  }

  bindEvent() {
    this.$lineAddButton.addEventListener('click', this.handleAddButton.bind(this));
    this.$$lineModal.$nameInput.addEventListener('input', this.handleNameInput.bind(this));
    this.$$lineModal.$form.addEventListener('submit', this.handleLineSubmit.bind(this));
    this.$$lineModal.$palette.addEventListener('click', this.handlePalette.bind(this));
    this.$lineList.addEventListener('click', this.handleModifyButton.bind(this));
    this.$lineList.addEventListener('click', this.handleRemoveButton.bind(this));
  }

  handleAddButton() {
    this.submitType = SUBMIT_TYPE.ADD;
    showModal(this.props.$modal);
  }

  handleNameInput({ target: { value: lineName } }) {
    if (!isValidName(lineName, NAME_LENGTH.LINE_MIN, NAME_LENGTH.LINE_MAX)) {
      this.$$lineModal.$failMessage.innerText = MESSAGE.LINE_MANAGE.INVALID_NAME;

      return;
    }

    this.$$lineModal.$failMessage.innerText = '';
  }

  handlePalette(event) {
    if (!event.target.classList.contains('color-option')) return;
    this.$$lineModal.$colorInput.value = event.target.dataset.color;
  }

  async handleLineSubmit(event) {
    event.preventDefault();
    const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
    const requestInfo = {
      id: this.$$lineModal.$form.dataset.lineId,
      name: this.$$lineModal.$nameInput.value,
      color: this.$$lineModal.$colorInput.value,
      upStationId: this.$$lineModal.$upStationSelector.value,
      downStationId: this.$$lineModal.$downStationSelector.value,
      distance: this.$$lineModal.$distanceInput.value,
      duration: this.$$lineModal.$durationInput.value,
    };

    try {
      // TODO: 상행, 하행같은 경우 처리 필요.
      // TODO: 상행역, 하행역으로 선택되었을 때도 처리되는 에러
      // if (requestInfo.upStationId === requestInfo.downStationId) {
      //   throw
      // }

      if (this.submitType === SUBMIT_TYPE.ADD) {
        const line = await lineManageAPI.addLine(accessToken, requestInfo);

        this.$lineList.innerHTML += lineInfo(line);
      }
      if (this.submitType === SUBMIT_TYPE.MODIFY) {
        await lineManageAPI.modifyLine(accessToken, requestInfo);
        await this.renderLineList();
      }

      this.$$lineModal.$form.reset();
      hideModal(this.props.$modal);
    } catch (error) {
      console.error(error.message);
      this.$$lineModal.$failMessage.innerText =
        error.message === '400' ? MESSAGE.LINE_MANAGE.OVERLAPPED_NAME : MESSAGE.RETRY;
    }
  }

  handleModifyButton({ target }) {
    if (!target.classList.contains('js-modify-button')) return;
    const line = target.closest('.js-line-list-item');

    this.submitType = SUBMIT_TYPE.MODIFY;
    this.$$lineModal.$form.dataset.lineId = line.dataset.id;
    this.$$lineModal.$nameInput.value = line.dataset.name;
    this.$$lineModal.$colorInput.value = line.dataset.color;
    showModal(this.props.$modal);
  }

  async handleRemoveButton({ target }) {
    if (!target.classList.contains('js-remove-button')) return;
    const $line = target.closest('.js-line-list-item');
    const requestInfo = {
      id: $line.dataset.id,
    };

    if (!confirm(MESSAGE.CONFIRM.STATION_REMOVE)) return;
    try {
      const accessToken = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN);
      await lineManageAPI.removeLine(accessToken, requestInfo);
      $line.remove();
    } catch (error) {
      console.error(error.message);
    }
  }
}
