class Component {
  constructor({ parentNode, childComponents = {}, state = {} }) {
    this.parentNode = parentNode;
    this.childComponents = childComponents;
    this.state = state;
  }

  setState(state) {
    this.state = state;
    this.render();
    this.setChildState();
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

  clear() {
    this.parentNode.innerHTML = '';
  }
}

export default Component;
