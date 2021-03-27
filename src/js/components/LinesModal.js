import { addLineAPI } from "../APIs/subwayAPI.js";
import { TOKEN_STORAGE_KEY, SPACE_REG_EXP } from "../constants/general.js";
import { $, $$, removeAllChildren } from "../utils/DOM.js";
import colorOptions from "../utils/mock.js";
import snackbar from "../utils/snackbar.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import Modal from "./common/Modal.js";

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}"></button> ${
    hasNewLine ? "<br/>" : ""
  }`;
};

const createStationSelectOption = (station) =>
  `<option value="${station.id}">${station.name}</option>`;

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
        <form>
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
              <select id="up-station" class="js-up-station js-station-select mr-2">
              </select>
              <label for="down-station" class="input-label" hidden>하행역</label>
              <select id="down-station" class="js-down-station js-station-select">
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
                required
              />
              <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
              <input
                type="number"
                id="duration"
                name="arrival"
                class="input-field"
                placeholder="상행 하행역 시간"
                required
              />
            </div>
          <div class="input-control">
            <div>
              <label for="subway-line-color" class="input-label" hidden>색상 선택</label>
              <input
                type="text"
                id="subway-line-color"
                name="subway-line-color"
                class="input-field"
                placeholder="색상을 아래에서 선택해주세요."
                required
              />
            </div>
          </div>
          <div class="subway-line-color-selector px-2">
            ${colorOptions.map(subwayLineColorOptionTemplate).join("")}
          </div>
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
    const lineData = {
      name: target.elements["subway-line-name"].value.replace(
        SPACE_REG_EXP,
        ""
      ),
      color: target.elements["subway-line-color"].value,
      upStationId: $(".js-up-station", target).value,
      downStationId: $(".js-down-station", target).value,
      distance: target.distance.value,
      duration: target.duration.value,
    };

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
    $selects.forEach(($select) => removeAllChildren($select));

    $(".js-up-station", this.innerElement).insertAdjacentHTML(
      "beforeend",
      upStationOption
    );
    $(".js-down-station", this.innerElement).insertAdjacentHTML(
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

  render() {
    super.render();
  }
}
