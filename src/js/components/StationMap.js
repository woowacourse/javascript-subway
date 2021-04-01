import { getLinesAPI } from "../APIs/subwayAPI";
import { TOKEN_STORAGE_KEY } from "../constants/general";
import { PAGE_KEYS, PAGE_URLS } from "../constants/pages";
import { createMap } from "../constants/template";
import { $, removeAllChildren } from "../utils/DOM";
import { getSessionStorageItem } from "../utils/sessionStorage";
import Component from "./common/Component";

export default class StationMap extends Component {
  constructor({ $parent, setPageState }) {
    super($parent);
    this.setPageState = setPageState;

    this.initContent();
  }

  initContent() {
    const template = `
      <div class="wrapper bg-white p-10">
        <div class="heading">
          <h2 class="mt-1">🗺 전체보기</h2>
        </div>
        <div class="js-maps mt-3 pl-0 overflow-x-auto"></div>
      </div>
    `;

    super.initContent(template);
  }

  updateMaps(lines) {
    const $maps = $(".js-maps", this.innerElement);

    removeAllChildren($maps);
    $maps.insertAdjacentHTML("beforeend", lines.map(createMap).join(""));
  }

  async loadPage() {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");
    const { isSucceeded, lines } = await getLinesAPI(accessToken);

    this.setPageState({
      isLoggedIn: isSucceeded,
      pageURL: isSucceeded
        ? PAGE_URLS[PAGE_KEYS.STATION_MAP]
        : PAGE_URLS[PAGE_KEYS.LOGIN],
    });

    this.updateMaps(lines);
    this.render();
  }
}
