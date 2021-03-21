class AccessTokenManager {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken') || '';
    this.listeners = [];
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

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }
}

const accessTokenManager = new AccessTokenManager();

export default accessTokenManager;
