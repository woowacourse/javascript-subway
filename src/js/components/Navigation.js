import Component from "./common/Component.js";
import { $, hideElement, showElement } from "../utils/DOM.js";
import snackbar from "../utils/snackbar.js";

import { NAV_ITEMS } from "../constants/templateData.js";
import { SUCCESS_MESSAGE } from "../constants/messages.js";
import { PAGE_KEYS, PAGE_URLS } from "../constants/pages.js";
import { removeSessionStorageItem } from "../utils/sessionStorage.js";
import { TOKEN_STORAGE_KEY } from "../constants/general.js";

const createNavListItem = (item) => {
  return `
    <li>
      <a href="${item.href}" class="js-page-link my-1 btn bg-white shadow d-flex items-center text-sm">
        ${item.title}
      </a>
    </li>
  `;
};

export default class Navigation extends Component {
  constructor({ $parent, setPageState, pageRouter }) {
    super($parent);
    this.setPageState = setPageState;
    this.pageRouter = pageRouter;

    this.initContent();
    this.render();
  }

  initContent() {
    const template = `
      <div>
        <ul class="d-flex justify-center flex-wrap">
          ${NAV_ITEMS.map((item) => createNavListItem(item)).join("")}
        </ul>
        <button type="button" class="js-logout-btn logout-btn">로그아웃</button>
      </div>
    `;

    super.initContent(template);
    this.attachEvents();
  }

  show() {
    showElement(this.$parent);
  }

  hide() {
    hideElement(this.$parent);
  }

  onClickNav(e) {
    e.preventDefault();

    if (!e.target.classList.contains("js-page-link")) {
      return;
    }

    const path = e.target.getAttribute("href");
    this.pageRouter.movePage(path);
  }

  onLogout() {
    removeSessionStorageItem(TOKEN_STORAGE_KEY);
    this.setPageState({
      isLoggedIn: false,
      pageURL: PAGE_URLS[PAGE_KEYS.LOGIN],
    });
    snackbar.show(SUCCESS_MESSAGE.MEMBER.LOGOUT);
  }

  attachEvents() {
    this.$parent.addEventListener("click", this.onClickNav.bind(this));
    $(".js-logout-btn", this.innerElement).addEventListener(
      "click",
      this.onLogout.bind(this)
    );
  }
}
