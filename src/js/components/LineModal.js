import { addLineAPI, modifyLineAPI } from "../APIs/subway/index.js";
import {
  TOKEN_STORAGE_KEY,
  SPACE_REG_EXP,
  LINE_NAME_MIN_LENGTH,
  LINE_NAME_MAX_LENGTH,
  LINE_MODAL_MODE,
} from "../constants/general.js";
import {
  $,
  $$,
  removeAllChildren,
  showElement,
  hideElement,
} from "../utils/DOM.js";
import colorOptions from "../utils/mock.js";
import snackbar from "../utils/snackbar.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import Modal from "./common/Modal.js";
import { ERROR_MESSAGE } from "../constants/messages.js";
import {
  createStationSelectOption,
  subwayLineColorOptionTemplate,
} from "../constants/template.js";
import { isLengthInRange } from "../utils/validator.js";

const getInputsErrorMessage = (lineData) => {
  const {
    name,
    upStationId,
    downStationId,
    distance,
    duration,
    color,
  } = lineData;

  const isValidNameLength = isLengthInRange(
    name,
    LINE_NAME_MIN_LENGTH,
    LINE_NAME_MAX_LENGTH
  );

  if (!isValidNameLength) {
    return ERROR_MESSAGE.LINE_NAME_LENGTH;
  }

  if (upStationId && upStationId === "") {
    return ERROR_MESSAGE.EMPTY_UP_STATION;
  }

  if (downStationId && downStationId === "") {
    return ERROR_MESSAGE.EMPTY_DOWN_STATION;
  }

  if (upStationId && upStationId === downStationId) {
    return ERROR_MESSAGE.SAME_UP_DOWN_STATION;
  }

  if (distance && distance < 1) {
    return ERROR_MESSAGE.INVALID_LINE_DISTANCE;
  }

  if (duration && duration < 1) {
    return ERROR_MESSAGE.INVALID_LINE_DURATION;
  }

  if (!color || color === "") {
    return ERROR_MESSAGE.EMPTY_LINE_COLOR;
  }

  return "";
};

const upStationOption = `<option value="" selected disabled hidden>상행역</option>`;
const downStationOption = `<option value="" selected disabled hidden>하행역</option>`;

export default class LineAddModal extends Modal {
  constructor({ addLine, modifyLine }) {
    super();
    this.addLine = addLine;
    this.modifyLine = modifyLine;
    this.prevDataForModify = {};
    this.mode = "";

    this.initContent();
  }

  initContent() {
    const template = `
      <div>
        <header>
          <h2 class="js-line-header text-center">🛤️ 노선 추가</h2>
        </header>
        <form class="max-h-70vh overflow-y-auto">
          <div class="input-control">
            <label for="subway-line-name" class="input-label" hidden>노선 이름</label>
            <input
              type="text"
              id="subway-line-name"
              name="subway-line-name"
              class="input-field"
              placeholder="노선 이름"
              maxlength="${LINE_NAME_MAX_LENGTH}"
              required
            />
          </div>
          <div class="js-element-for-add">
            <div class="d-flex items-center input-control">
                <label for="up-station" class="input-label" hidden>상행역</label>
                <select id="up-station" name="up-station" class="js-station-select mr-2">
                </select>
                <label for="down-station" class="input-label" hidden>하행역</label>
                <select id="down-station" name="down-station" class="js-station-select">
                </select>
            </div>
            <div class="input-control">
              <label for="distance" class="input-label" hidden>상행 하행역 거리</label>
              <input
                type="number"
                id="distance"
                name="distance"
                class="input-field mr-2"
                placeholder="상행 하행역 거리"
                min="1"
              />
              <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
              <input
                type="number"
                id="duration"
                name="arrival"
                class="input-field"
                placeholder="상행 하행역 시간"
                min="1"
              />
            </div>
          </div>
          <div class="subway-line-color-selector px-2">
            <p>색상을 선택하세요.</p>
            ${colorOptions.map(subwayLineColorOptionTemplate).join("")}
          </div>
          <p class="js-line-modal-error-message text-base text-red text-center"></p>
          <div class="d-flex justify-end mt-3">
            <button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300 w-100"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    `;

    super.initContent(template);
    this.attachEvent();
  }

  onSubmitLine(event) {
    event.preventDefault();

    if (this.mode === LINE_MODAL_MODE.ADD) {
      this.onAddLine(event);

      return;
    }

    if (this.mode === LINE_MODAL_MODE.MODIFY) {
      this.onModifyLine(event);
    }
  }

  async onAddLine({ target }) {
    const $message = $(".js-line-modal-error-message", this.innerElement);
    const lineData = {
      name: target.elements["subway-line-name"].value.replace(
        SPACE_REG_EXP,
        ""
      ),
      color: target.elements["subway-line-color"].value,
      upStationId: target.elements["up-station"].value,
      downStationId: target.elements["down-station"].value,
      distance: target.distance.value,
      duration: target.duration.value,
    };
    const inputsErrorMessage = getInputsErrorMessage(lineData);

    if (inputsErrorMessage !== "") {
      $message.textContent = inputsErrorMessage;

      return;
    }

    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const { isSucceeded, line, message } = await addLineAPI(
      lineData,
      accessToken
    );

    if (isSucceeded) {
      this.addLine(line);
      snackbar.show(message);
      target.reset();
      this.close();

      return;
    }

    $message.textContent = message;
    // eslint-disable-next-line no-param-reassign
    target.elements["subway-line-name"].value = lineData.name;
  }

  async onModifyLine({ target }) {
    const $message = $(".js-line-modal-error-message", this.innerElement);
    const lineData = {
      id: this.prevDataForModify.id,
      name: target.elements["subway-line-name"].value.replace(
        SPACE_REG_EXP,
        ""
      ),
      color: target.elements["subway-line-color"].value,
    };

    const inputsErrorMessage = getInputsErrorMessage(lineData);

    if (inputsErrorMessage !== "") {
      $message.textContent = inputsErrorMessage;

      return;
    }

    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const { isSucceeded, message } = await modifyLineAPI(lineData, accessToken);

    if (isSucceeded) {
      this.modifyLine(lineData);
      snackbar.show(message);
      target.reset();
      this.close();

      return;
    }

    $message.textContent = message;
    // eslint-disable-next-line no-param-reassign
    target.elements["subway-line-name"].value = lineData.name;
  }

  attachEvent() {
    super.attachEvent();
    $("form", this.innerElement).addEventListener(
      "submit",
      this.onSubmitLine.bind(this)
    );
  }

  renderSelectOption(stations) {
    const $selects = $$(".js-station-select", this.innerElement);
    const $form = $("form", this.innerElement);

    $selects.forEach(($select) => removeAllChildren($select));

    $form.elements["up-station"].insertAdjacentHTML(
      "beforeend",
      upStationOption
    );
    $form.elements["down-station"].insertAdjacentHTML(
      "beforeend",
      downStationOption
    );

    $selects.forEach(($select) =>
      $select.insertAdjacentHTML(
        "beforeend",
        stations.map(createStationSelectOption).join("")
      )
    );

    this.render();
  }

  openForAdd() {
    showElement($(".js-element-for-add", this.innerElement));
    $(".js-line-header", this.innerElement).textContent = "🛤️ 노선추가";
    $("form", this.innerElement).reset();
    this.mode = LINE_MODAL_MODE.ADD;

    super.open();
  }

  // eslint-disable-next-line no-unused-vars
  openForModify({ lineId, lineName, lineColor }) {
    hideElement($(".js-element-for-add", this.innerElement));

    $("form", this.innerElement).reset();
    $(
      ".js-line-header",
      this.innerElement
    ).textContent = `🛤️ ${lineName} 수정하기`;
    $(`input[data-color="${lineColor}"]`, this.innerElement).checked = true;
    this.mode = LINE_MODAL_MODE.MODIFY;
    this.prevDataForModify = {
      id: lineId,
      name: lineName,
    };

    super.open();
  }

  close() {
    $(".js-line-modal-error-message", this.innerElement).textContent = "";
    super.close();
  }
}
