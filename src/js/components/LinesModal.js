import { addLineAPI } from "../APIs/subwayAPI.js";
import {
  TOKEN_STORAGE_KEY,
  SPACE_REG_EXP,
  LINE_NAME_MIN_LENGTH,
  LINE_NAME_MAX_LENGTH,
} from "../constants/general.js";
import { $, $$, removeAllChildren } from "../utils/DOM.js";
import colorOptions from "../utils/mock.js";
import snackbar from "../utils/snackbar.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import Modal from "./common/Modal.js";
import { ERROR_MESSAGE } from "../constants/messages.js";

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `
    <label class="color-option">
      <input name="subway-line-color" value="bg-${color}" type="radio" required />
      <span class="radio bg-${color}"></span>
    </label>
    ${hasNewLine ? "<br/>" : ""}
  `;
};

const createStationSelectOption = (station) =>
  `<option value="${station.id}">${station.name}</option>`;

const getInputsErrorMessage = (lineData) => {
  const isValidNameLength =
    lineData.name.length >= LINE_NAME_MIN_LENGTH &&
    lineData.name.length <= LINE_NAME_MAX_LENGTH;

  if (!isValidNameLength) {
    return ERROR_MESSAGE.LINE_NAME_LENGTH;
  }

  if (lineData.upStationId === "") {
    return ERROR_MESSAGE.EMPTY_UP_STATION;
  }

  if (lineData.downStationId === "") {
    return ERROR_MESSAGE.EMPTY_DOWN_STATION;
  }

  if (lineData.upStationId === lineData.downStationId) {
    return ERROR_MESSAGE.SAME_UP_DOWN_STATION;
  }

  if (lineData.distance < 1) {
    return ERROR_MESSAGE.INVALID_LINE_DISTANCE;
  }

  if (lineData.duration < 1) {
    return ERROR_MESSAGE.INVALID_LINE_DURATION;
  }

  if (!lineData.color || lineData.color === "") {
    return ERROR_MESSAGE.EMPTY_LINE_COLOR;
  }

  return "";
};

const upStationOption = `<option value="" selected disabled hidden>상행역</option>`;
const downStationOption = `<option value="" selected disabled hidden>하행역</option>`;
export default class LinesModal extends Modal {
  constructor({ addLine }) {
    super();
    this.addLine = addLine;

    this.initContent();
  }

  initContent() {
    const template = `
      <div>
        <header>
          <h2 class="text-center">🛤️ 노선 추가</h2>
        </header>
        <form class="h-70vh overflow-y-auto">
          <div class="input-control">
            <label for="subway-line-name" class="input-label" hidden>노선 이름</label>
            <input
              type="text"
              id="subway-line-name"
              name="subway-line-name"
              class="input-field"
              placeholder="노선 이름"
              required
            />
          </div>
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
                required
              />
              <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
              <input
                type="number"
                id="duration"
                name="arrival"
                class="input-field"
                placeholder="상행 하행역 시간"
                min="1"
                required
              />
            </div>
          <div class="subway-line-color-selector px-2">
            <p>색상을 선택하세요.</p>
            ${colorOptions.map(subwayLineColorOptionTemplate).join("")}
          </div>
          <p class="js-add-line-message text-base text-red text-center"></p>
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

  async onAddLine(event) {
    event.preventDefault();

    const { target } = event;
    const $message = $(".js-add-line-message", this.innerElement);
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
    target.elements["subway-line-name"].value = lineData.name;
  }

  attachEvent() {
    super.attachEvent();
    $("form", this.innerElement).addEventListener(
      "submit",
      this.onAddLine.bind(this)
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

  open() {
    $("form", this.innerElement).reset();
    super.open();
  }

  render() {
    super.render();
  }
}
