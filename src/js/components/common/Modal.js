import staticElements from "../../constants/staticElements.js";
import Component from "./Component.js";

export default class Modal extends Component {
  constructor() {
    super(staticElements.$modalContent);
    this.$modal = staticElements.$modal;
    this.$modalCloseBtn = staticElements.$modalCloseBtn;
  }

  initContent(template) {
    super.initContent(template);
  }

  attachEvent() {
    this.$modalCloseBtn.addEventListener("click", this.close.bind(this));
    this.$modal.addEventListener("click", ({ currentTarget, target }) => {
      if (currentTarget === target) {
        this.close();
      }
    });
  }

  open() {
    this.$modal.classList.add("open");
    this.render();
  }

  close() {
    this.$modal.classList.remove("open");
  }

  render() {
    super.render();
  }
}
