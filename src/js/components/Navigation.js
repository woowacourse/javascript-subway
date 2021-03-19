import { NAV_ITEMS } from "../constants/templateData.js";
import { $, hideElement, showElement } from "../utils/DOM.js";

const createNavListItem = (item) => {
  return `
    <li>
      <a href="${item.href}" class="js-page-link my-1 btn bg-white shadow d-flex items-center text-sm">
        ${item.title}
      </a>
    </li>
  `;
};

export default class Navigation {
  constructor({ $parent, setIsLoggedIn, pageRouter }) {
    this.$parent = $parent;
    this.setIsLoggedIn = setIsLoggedIn;
    this.pageRouter = pageRouter;

    this.render();
  }

  show() {
    showElement(this.$parent);
  }

  hide() {
    hideElement(this.$parent);
  }

  onClickNav(e) {
    if (!e.target.classList.contains("js-page-link")) {
      return;
    }
    e.preventDefault();

    const path = e.target.getAttribute("href");
    this.pageRouter.movePage(path);
  }

  onLogout() {
    this.setIsLoggedIn(false);
  }

  attachEvents() {
    this.$parent.addEventListener("click", this.onClickNav.bind(this));
    $(".js-logout-btn", this.$parent).addEventListener(
      "click",
      this.onLogout.bind(this)
    );
  }

  render() {
    const template = `
      <ul class="d-flex justify-center flex-wrap">
        ${NAV_ITEMS.map((item) => createNavListItem(item)).join("")}
      </ul>
      <button type="button" class="js-logout-btn logout-btn">로그아웃</button>
    `;

    this.$parent.innerHTML = template;

    this.attachEvents();
  }
}
