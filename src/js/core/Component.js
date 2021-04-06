class Component {
  constructor(parentNode, stateManagers, childComponents = {}) {
    this.parentNode = parentNode;
    this.stateManagers = stateManagers;
    this.childComponents = childComponents;
  }

  render() {
    this.renderSelf();
    this.addEventListeners();
  }

  renderSelf() {}

  addEventListeners() {}

  clear() {
    this.parentNode.innerHTML = '';
  }
}

export default Component;
