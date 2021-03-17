import staticElements from "../constants/staticElements.js";

export default class Modal {
  constructor() {
    this.$modal = staticElements.$modal;
    this.$modalInner = staticElements.$modalInner;
    this.$modalCloseBtn = staticElements.$modalCloseBtn;
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
  }

  close() {
    this.$modal.classList.remove("open");
  }

  render() {
    this.$modalInner.innerHTML = "";
  }
}
