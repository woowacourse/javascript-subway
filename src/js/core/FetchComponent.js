import Component from './Component.js';

class FetchComponent extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);

    this.itemList = [];
    this.addEventListeners();
    this.update();
  }

  // TODO: 최적화 필요
  async update() {
    this.setItemList((await this.fetchGetItemList()) || []);
  }

  setItemList(itemList) {
    this.itemList = itemList;
    this.render(this.itemList);
  }

  fetchGetItemList() {}
}

export default FetchComponent;
