import Component from './Component.js';

class FetchComponent extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
    this.updateItemList();
  }

  // TODO: 최적화 필요
  async updateItemList() {
    const itemList = (await this.fetchGetItemList()) || [];
    this.render(itemList);
    this.addEventListeners();
  }

  fetchGetItemList() {}
}

export default FetchComponent;
