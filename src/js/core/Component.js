class Component {
  constructor(parentNode) {
    this.parentNode = parentNode;

    this.render();
    this.addEventListeners();
  }

  render() {}

  addEventListeners() {}

  clear() {
    this.parentNode.innerHTML = '';
  }
}

export default Component;
