import StateManager from '../core/StateManager.js';
import fetchGetSubwayState from '../api/fetchGetSubwayState.js';

class SubwayStateManager extends StateManager {
  constructor() {
    super();
    this.subwayState = {
      stations: [],
      lines: [],
    };
  }

  async updateSubwayState(accessToken) {
    const state = await fetchGetSubwayState(accessToken);

    this.setSubwayState(state);
    this.notify();
  }

  setSubwayState(state) {
    this.subwayState = { ...state };
  }

  getSubwayState() {
    return this.subwayState;
  }
}

export default SubwayStateManager;
