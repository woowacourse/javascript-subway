class Component {
  constructor(parentNode, stateManagers, childComponents = {}, state = {}) {
    this.parentNode = parentNode;
    this.stateManagers = stateManagers;
    this.childComponents = childComponents;
    this.state = state;
    this.requestType = '';
  }

  setState(state) {
    this.state = state;
    this.setChildState();
    this.render();
  }

  render() {
    this.renderSelf();
    this.addEventListeners();
  }

  setChildState() {
    Object.values(this.childComponents).forEach((child) => {
      child.setState(this.state);
    });
  }

  renderSelf() {}

  addEventListeners() {}

  setChildProps(name, props) {
    Object.entries(props).forEach(([key, value]) => {
      this.childComponents[name][key] = value;
    });
  }

  fetchState() {}
}

export default Component;
