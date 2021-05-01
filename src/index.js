import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import Station from './components/station.js';
import Line from './components/line.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';
import Section from './components/section';
import Subway from './components/subway';
import Main from './components/main.js';
import { SELECTOR_ID, PATH, STATE_KEY, SELECTOR_CLASS } from './constants.js';
import router from './router/router.js';
import { state } from './store.js';
import LineModal from './components/lineModal';
import SectionModal from './components/sectionModal';

state.initState();

const main = new Main(state, `#${SELECTOR_ID.GUIDE_WRAPPER}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const station = new Station(state, `#${SELECTOR_ID.STATION_LIST}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const line = new Line(state, `#${SELECTOR_ID.LINE_LIST}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const lineModal = new LineModal(state, `#${SELECTOR_ID.SUBWAY_LINE_FORM}`, `.${SELECTOR_CLASS.MODAL}`);
const section = new Section(
  state,
  `#${SELECTOR_ID.SECTION_LINE}`,
  `#${SELECTOR_ID.SECTION_STATION_LIST}`,
  `#${SELECTOR_ID.MAIN_CONTAINER}`
);
const sectionModal = new SectionModal(state, `#${SELECTOR_ID.SUBWAY_SECTION_FORM}`, `.${SELECTOR_CLASS.MODAL}`);
const subway = new Subway(state, `#${SELECTOR_ID.SUBWAY_MAP_CONTAINER}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const login = new Login(`#${SELECTOR_ID.LOG_IN_FORM}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const signUp = new SignUp(`#${SELECTOR_ID.SIGN_UP_FORM_WRAPPER}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const navigator = new Navigator(state, `#${SELECTOR_ID.NAVIGATOR}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);

const connections = [
  { path: [PATH.STATIONS], component: station, },
  { path: [PATH.LINES], component: line, },
  { path: [PATH.LINES], component: lineModal, },
  { path: [PATH.SECTIONS], component: section, },
  { path: [PATH.SECTIONS], component: sectionModal, },
  { path: [PATH.SUBWAY], component: subway, },
  { path: [PATH.LOG_IN], component: login, },
  { path: [PATH.SIGN_UP], component: signUp, },
  { path: [PATH.ROOT], component: main, },
];

connections.forEach(connection => {
  router.register(connection.path, connection.component);
});
router.initRouteEvent();

state.subscribe(STATE_KEY.IS_LOGGED_IN, navigator);
state.subscribe(STATE_KEY.TARGET_MENU, navigator);
state.subscribe(STATE_KEY.STATION_LIST, station);
state.subscribe(STATE_KEY.LINE_LIST, line);
state.subscribe(STATE_KEY.LINE_LIST, section);
state.subscribe(STATE_KEY.LINE_LIST, subway);
state.subscribe(STATE_KEY.STATION_LIST, section);
state.subscribe(STATE_KEY.TARGET_LINE_ID, lineModal);
state.subscribe(STATE_KEY.TARGET_SECTION_LINE_ID, sectionModal);
state.subscribe(STATE_KEY.TARGET_SECTION_LINE_ID, section);

navigator.renderComponent();
