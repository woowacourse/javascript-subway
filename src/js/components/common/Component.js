import { $, removeAllChildren } from "../../utils/DOM.js";

export default class Component {
  constructor($parent) {
    this.$parent = $parent;
    this.innerElement = null;
  }

  initContent(template) {
    const parser = new DOMParser();

    this.innerElement = $(
      "body > *",
      parser.parseFromString(template, "text/html")
    );
  }

  render() {
    removeAllChildren(this.$parent);
    this.$parent.append(this.innerElement);
  }
}
