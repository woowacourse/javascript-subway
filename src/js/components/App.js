import { $ } from "../utils/DOM.js";
import Header from "./Header.js";

export default class App {
  constructor() {
    this.header = new Header({ $parent: $("header") });
  }
}
