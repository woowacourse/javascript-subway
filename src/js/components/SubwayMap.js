import { getLinesAPI } from "../APIs/index.js";
import { PAGE_KEYS, PAGE_URLS } from "../constants/pages.js";
import { createLineTemplate } from "../constants/template.js";
import { $, removeAllChildren } from "../utils/DOM.js";
import Component from "./common/Component";

export default class SubwayMap extends Component {
  constructor({ $parent, setPageState }) {
    super($parent);
    this.lineData = [];
    this.setPageState = setPageState;

    this.initContent();
  }

  initContent() {
    const template = `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🗺 전체 보기</h2>
        </div>
        <div class="js-map-wrapper map-wrapper ml-5"><div>
      </div>
    `;

    super.initContent(template);
  }

  updateSubwayMapDOM() {
    const $mapWrapper = $(".js-map-wrapper", this.innerElement);
    const template = this.lineData.map(createLineTemplate).join("");

    removeAllChildren($mapWrapper);
    $mapWrapper.insertAdjacentHTML("beforeend", template);
  }

  async setSubwayMapData() {
    const { isSucceeded, lines } = await getLinesAPI();

    this.setPageState({
      isLoggedIn: isSucceeded,
      pageURL: isSucceeded
        ? PAGE_URLS[PAGE_KEYS.MAP]
        : PAGE_URLS[PAGE_KEYS.LOGIN],
    });

    if (isSucceeded) {
      this.lineData = lines;
    }
  }

  async loadPage() {
    await this.setSubwayMapData();
    this.updateSubwayMapDOM();
    this.render();
  }
}
