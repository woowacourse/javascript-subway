import { NAV_ITEMS } from "../constants/templateData.js";
import { hideElement, showElement } from "../utils/DOM.js";

export default class Header {
  constructor({ $parent }) {
    this.$parent = $parent;

    this.render();
  }

  show() {
    showElement(this.$parent);
  }

  hide() {
    hideElement(this.$parent);
  }

  createNavListItem(item) {
    return `
      <li>
        <a href="${item.href}" class="my-1 btn bg-white shadow d-flex items-center text-sm">
          ${item.title}
        </a>
      </li>
    `;
  }

  render() {
    const template = `
      <a href="/" class="text-black">
        <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
      </a>
      <nav>
        <ul class="d-flex justify-center flex-wrap">
          ${NAV_ITEMS.map((item) => this.createNavListItem(item)).join("")}
        </ul>
      </nav>
    `;

    this.$parent.innerHTML = template;
  }
}
