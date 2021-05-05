import Navigation from "./Navigation.js";
import PageRouter from "../models/PageRouter.js";

import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import Stations from "./Stations.js";
import Lines from "./Lines.js";
import Sections from "./Sections.js";
import SubwayMap from "./SubwayMap.js";

import staticElements from "../constants/staticElements.js";
import { PAGE_URLS, PAGE_KEYS } from "../constants/pages.js";
import { getSessionStorageItem } from "../utils/sessionStorage.js";
import { TOKEN_STORAGE_KEY } from "../constants/general.js";
import { getMemberInfo } from "../APIs/index.js";

export default class App {
  constructor() {
    this.pageState = {
      isLoggedIn: false,
      pageURL: "",
    };
    this.userName = "";
    this.pageRouter = new PageRouter();

    this.navigation = new Navigation({
      $parent: staticElements.$nav,
      setPageState: this.setPageState.bind(this),
      pageRouter: this.pageRouter,
    });

    this.pages = {
      [PAGE_KEYS.LOGIN]: new LoginForm({
        $parent: staticElements.$main,
        setPageState: this.setPageState.bind(this),
        pageRouter: this.pageRouter,
      }),
      [PAGE_KEYS.SIGNUP]: new SignupForm({
        $parent: staticElements.$main,
        pageRouter: this.pageRouter,
      }),
      [PAGE_KEYS.STATIONS]: new Stations({
        $parent: staticElements.$main,
        setPageState: this.setPageState.bind(this),
      }),
      [PAGE_KEYS.LINES]: new Lines({
        $parent: staticElements.$main,
        setPageState: this.setPageState.bind(this),
      }),
      [PAGE_KEYS.SECTIONS]: new Sections({
        $parent: staticElements.$main,
        setPageState: this.setPageState.bind(this),
      }),
      [PAGE_KEYS.MAP]: new SubwayMap({
        $parent: staticElements.$main,
        setPageState: this.setPageState.bind(this),
      }),
    };
  }

  registerRoutes() {
    Object.keys(this.pages).forEach((key) => {
      this.pageRouter.registerRoute({
        path: PAGE_URLS[key],
        handler: this.pages[key].loadPage.bind(this.pages[key]),
      });
    });
  }

  setPageState({ isLoggedIn, pageURL }) {
    if (
      this.pageState.isLoggedIn === isLoggedIn &&
      this.pageState.pageURL === pageURL
    ) {
      return;
    }

    this.pageState.isLoggedIn = isLoggedIn;
    this.pageState.pageURL = pageURL;
    this.render();
  }

  render() {
    if (this.pageState.isLoggedIn) {
      this.navigation.show();
    } else {
      this.navigation.hide();
    }

    this.pageRouter.movePage(this.pageState.pageURL);
  }

  async initUserState() {
    const accessToken = getSessionStorageItem(TOKEN_STORAGE_KEY, "");

    if (accessToken === "") {
      this.setPageState({
        isLoggedIn: false,
        pageURL: PAGE_URLS[PAGE_KEYS.LOGIN],
      });

      return;
    }

    const { isSucceeded, memberInfo } = await getMemberInfo(accessToken);

    this.setPageState({
      isLoggedIn: isSucceeded,
      pageURL: isSucceeded
        ? PAGE_URLS[PAGE_KEYS.STATIONS]
        : PAGE_URLS[PAGE_KEYS.LOGIN],
    });
    this.userName = memberInfo?.name ?? "";
  }

  init() {
    this.registerRoutes();
    this.initUserState();
  }
}
