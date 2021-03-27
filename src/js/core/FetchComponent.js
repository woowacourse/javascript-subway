import Component from './Component.js';

class FetchComponent extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);

    this.itemList = [];
    this.update();
  }

  async update() {
    const newItemList = (await this.fetchGetItemList()) || [];
    this.setItemList(newItemList);
  }

  // TODO: 최적화 필요
  setItemList(itemList) {
    this.itemList = itemList;
    this.render(this.itemList);
    this.addEventListeners();
  }

  fetchGetItemList() {}
}

export default FetchComponent;
