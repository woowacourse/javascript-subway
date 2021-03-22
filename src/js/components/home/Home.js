import { homeTemplate } from './homeTemplate.js';

class Home {
  constructor() {
    this.isLoggedIn = false;
  }

  init({ isLoggedIn }) {
    this.isLoggedIn = isLoggedIn;
  }

  // TODO : getPageInfo 변수명 개선..
  getPageInfo() {
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
