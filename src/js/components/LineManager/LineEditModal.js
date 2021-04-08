import { SELECTOR, MESSAGES } from '../../constants/constants.js';
import { $ } from '../../utils/dom.js';
import popSnackbar from '../../utils/snackbar.js';
import { editLineRequest } from '../../request.js';

export default class LineEditModal {
  constructor(store) {
    this.store = store;
    this.$root = $(SELECTOR.MODAL);

    this.state = {
      color: '',
      name: '',
    };
    this.isLineNameAvailable = true;
  }

  init(line) {
    this.line = line;
    this.selectDOM();
    this.setModalTitle();
  }

  setModalTitle() {
    $(SELECTOR.LINE_MODAL_TITLE).textContent = '🛤️ 노선 수정';
  }

  selectDOM() {
    this.$lineNameInput = $(SELECTOR.LINE_NAME_INPUT);
    this.$lineColorInput = $(SELECTOR.LINE_COLOR_INPUT);
  }

  activateInput() {
    $(SELECTOR.LINE_UP_DOWN_STATION_CONTAINER).innerHTML = '';

    this.setEditingState();
    this.setEditForm();
  }

  setEditingState() {
    const { name, color } = this.line;

    this.state = { name, color };
  }

  setEditForm() {
    const { name, color } = this.line;

    this.$lineNameInput.setAttribute('placeholder', name);
    this.$lineNameInput.setAttribute('value', name);
    this.$lineColorInput.setAttribute('placeholder', color);
    this.$lineColorInput.setAttribute('value', color);
  }

  isNameDuplicated(name) {
    if (name === this.state.name) {
      this.isLineNameAvailable = true;

      return false;
    }

    if (this.store.lines.find((line) => line.name === name)) {
      this.isLineNameAvailable = false;
      this.$lineNameInput.select();

      return true;
    }
    this.isLineNameAvailable = true;
    return false;
  }

  async handleSubmit(formData) {
    if (!this.isLineNameAvailable) return;

    const {
      'subway-line-color': { value: color },
      'subway-line-name': { value: name },
    } = formData;
    this.state = { color, name };

    await this.editLine();
  }

  async editLine() {
    const accessToken = this.store.userAuth.accessToken;
    const data = { name: this.state.name, color: this.state.color };

    try {
      await editLineRequest(this.line.id, data, accessToken);
      popSnackbar(MESSAGES.LINE_EDIT.SUCCESS);

      this.$root.dispatchEvent(
        new CustomEvent('editLine', {
          detail: {
            line: this.line,
            data,
          },
        })
      );
    } catch (error) {
      console.error(error);
      popSnackbar(MESSAGES.LINE_EDIT.FAIL);
    }
  }
}
