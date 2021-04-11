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

// 앱 상태 초기화
state.initState();

// 앱 컴포넌트 생성
const main = new Main(state, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const station = new Station(state, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const line = new Line(state, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const lineModal = new LineModal(state, `.${SELECTOR_CLASS.MODAL}`);
const section = new Section(state, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const sectionModal = new SectionModal(state, `.${SELECTOR_CLASS.MODAL}`);
const subway = new Subway(state, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const login = new Login(`#${SELECTOR_ID.MAIN_CONTAINER}`);
const signUp = new SignUp(`#${SELECTOR_ID.MAIN_CONTAINER}`);
const navigator = new Navigator(state, `#${SELECTOR_ID.NAVIGATOR}`);

// 라우팅 등록
router.register(PATH.STATIONS, station);
router.register(PATH.LINES, line);
router.register(PATH.LINES, lineModal);
router.register(PATH.SECTIONS, section);
router.register(PATH.SECTIONS, sectionModal);
router.register(PATH.SUBWAY, subway);
router.register(PATH.LOG_IN, login);
router.register(PATH.SIGN_UP, signUp);
router.register(PATH.ROOT, main);
router.initRouteEvent();

// 옵저버 등록
state.subscribe(STATE_KEY.IS_LOGGED_IN, navigator);
state.subscribe(STATE_KEY.STATION_LIST, station);
state.subscribe(STATE_KEY.LINE_LIST, line);
state.subscribe(STATE_KEY.LINE_LIST, section);
state.subscribe(STATE_KEY.STATION_LIST, section);
state.subscribe(STATE_KEY.TARGET_LINE_ID, lineModal);
state.subscribe(STATE_KEY.TARGET_SECTION_LINE_ID, sectionModal);
state.subscribe(STATE_KEY.TARGET_SECTION_LINE_ID, section);

navigator.renderComponent();
