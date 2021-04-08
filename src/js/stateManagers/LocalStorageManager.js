import StateManager from '../core/StateManager.js';

class LocalStorageManager extends StateManager {
  constructor() {
    super();
    this.accessToken = localStorage.getItem('accessToken') || '';
  }

  setToken(token) {
    this.accessToken = token;
    localStorage.setItem('accessToken', this.accessToken);
    this.notify();
  }

  getToken() {
    return this.accessToken;
  }

  clearToken() {
    this.setToken('');
    localStorage.removeItem('accessToken');
  }
}

export default LocalStorageManager;
