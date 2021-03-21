class AccessTokenManager {
  constructor() {
    this.accessToken = '';
    this.listeners = [];
  }

  setToken(token) {
    this.accessToken = token;
    this.notify();
  }

  getToken() {
    return this.accessToken;
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
