import Modal from "./common/Modal.js";
import { addSectionAPI } from "../APIs/subwayAPI.js";
import { $, $$, removeAllChildren } from "../utils/DOM.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import snackbar from "../utils/snackbar.js";
import { TOKEN_STORAGE_KEY } from "../constants/general.js";
import { createStationSelectOption } from "../constants/template.js";

const prevStationOption = `<option value="" selected disabled hidden>이전역</option>`;
const nextStationOption = `<option value="" selected disabled hidden>다음역</option>`;
export default class SectionsModal extends Modal {
  // eslint-disable-next-line no-useless-constructor
  constructor({ loadPage }) {
    super();
    this.lineId = "";
    this.loadPage = loadPage;

    this.initContent();
  }

  initContent() {
    const template = `
      <div>
        <header>
          <h2 class="js-section-modal-header text-center"></h2>
        </header>
        <form>
          <div class="d-flex items-center input-control">
            <select class="js-station-select js-prev-station">
              <option value="" selected disabled hidden>이전역</option>
            </select>
            <div class="d-inline-block mx-3 text-2xl">➡️</div>
            <select class="js-station-select js-next-station">
              <option value="" selected disabled hidden>다음역</option>
            </select>
          </div>
          <div class="input-control">
            <label for="distance" class="input-label" hidden>거리</label>
            <input
              type="number"
              id="distance"
              name="distance"
              class="input-field mr-2"
              placeholder="이전역과 다음역 사이의 거리"
              min="1"
            />
            <label for="duration" class="input-label" hidden>시간</label>
            <input
              type="number"
              id="duration"
              name="arrival"
              class="input-field"
              placeholder="이전역과 다음역 사이의 시간"
              min="1"
            />
          </div>
          <p class="js-section-modal-error-message text-base text-red text-center"></p>
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

  attachEvent() {
    super.attachEvent();
    $("form", this.innerElement).addEventListener(
      "submit",
      this.onAddSection.bind(this)
    );
  }

  async onAddSection(event) {
    event.preventDefault();

    const { target } = event;
    const $message = $(".js-section-modal-error-message", target);
    const sectionData = {
      upStationId: $(".js-prev-station", target).value,
      downStationId: $(".js-next-station", target).value,
      distance: target.distance.value,
      duration: target.duration.value,
    };

    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const { isSucceeded, message } = await addSectionAPI(
      this.lineId,
      sectionData,
      accessToken
    );

    if (isSucceeded) {
      snackbar.show(message);
      target.reset();
      this.close();
      this.loadPage(this.lineId);

      return;
    }

    $message.textContent = message;
  }

  renderSelectOption(stations) {
    const $selects = $$(".js-station-select", this.innerElement);

    $selects.forEach(($select) => removeAllChildren($select));
    $(".js-prev-station", this.innerElement).insertAdjacentHTML(
      "beforeend",
      prevStationOption
    );
    $(".js-next-station", this.innerElement).insertAdjacentHTML(
      "beforeend",
      nextStationOption
    );

    $selects.forEach(($select) => {
      $select.insertAdjacentHTML(
        "beforeend",
        stations.map(createStationSelectOption).join("")
      );
    });
  }

  open({ lineId, lineName, stations }) {
    this.lineId = lineId;

    $(
      ".js-section-modal-header",
      this.innerElement
    ).textContent = `🔁 ${lineName} 구간 추가`;

    this.renderSelectOption(stations);

    super.open();
  }

  close() {
    $("form", this.innerElement).reset();
    $(".js-section-modal-error-message", this.innerElement).textContent = "";

    super.close();
  }

  render() {
    super.render();
  }
}
