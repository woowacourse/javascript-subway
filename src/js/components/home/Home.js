import { PAGE_TITLE } from '../../constants';
import { homeTemplate } from './homeTemplate';

class Home {
  #isLoggedIn;

  constructor() {
    this.#isLoggedIn = false;
  }

  init({ isLoggedIn }) {
    this.#isLoggedIn = isLoggedIn;
  }

  getPageInfo() {
    return {
      title: PAGE_TITLE.HOME,
      contents: {
        main: homeTemplate(this.#isLoggedIn),
      },
    };
  }
}

export default Home;
