import { homeTemplate } from './homeTemplate.js';

class Home {
  constructor() {
    this.isLoggedIn = false;
  }

  init({ isLoggedIn }) {
    this.isLoggedIn = isLoggedIn;
  }

  // TODO : getInfo 변수명 개선..
  getInfo() {
    return {
      title: '🚇 지하철 APP',
      contents: {
        main: homeTemplate(this.isLoggedIn),
      },
    };
  }

  initDOM() {
    // setlectDOM, bindEVENT
  }
}

export default Home;
