class Component {
  constructor({ parentNode, state = {} }) {
    this.parentNode = parentNode;
    this.state = state;
    this.childComponents = {};
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

  clear() {
    this.parentNode.innerHTML = '';
  }
}

export default Component;
