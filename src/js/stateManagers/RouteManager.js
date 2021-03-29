import StateManager from '../core/StateManager.js';

class RouteManager extends StateManager {
  constructor() {
    super();
  }

  goPage(route) {
    history.pushState({ route }, null, route);
    this.notify();
  }
}

export default RouteManager;
