class Component {
  constructor(parentNode, stateManagers) {
    this.parentNode = parentNode;
    this.stateManagers = stateManagers;

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
