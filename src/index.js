import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import Station from './components/station.js';
import Line from './components/line.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';
import Main from './components/main.js';
import { SELECTOR_ID, PATH, STATE_KEY } from './constants.js';
import State from './lib/State.js';
import Router from './router/router.js';
import AppEvents from './appEvents.js';

// 앱 상태 초기화
const state = new State();

// 앱 컴포넌트 생성
const main = new Main(state, `#${SELECTOR_ID.GUIDE_WRAPPER}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const station = new Station(state, `#${SELECTOR_ID.STATION_LIST}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const line = new Line(state, `#${SELECTOR_ID.LINE_LIST}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const login = new Login(`#${SELECTOR_ID.LOG_IN_FORM}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const signUp = new SignUp(`#${SELECTOR_ID.SIGN_UP_FORM}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const navigator = new Navigator(state, `#${SELECTOR_ID.NAVIGATOR}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);

// 라우터 생성
const router = new Router();

// 라우팅 등록
router.register(PATH.STATIONS, station);
router.register(PATH.LINES, line);
router.register(PATH.LOG_IN, login);
router.register(PATH.SIGN_UP, signUp);
router.register(PATH.ROOT, main);
router.initRouteEvent();

// 전역 이벤트 위임 객체 생성
const appEvents = new AppEvents(state, router);
appEvents.delegateEvents();

// 옵저버 등록
state.subscribe(STATE_KEY.IS_LOGGED_IN, navigator);

// 네비게이터 렌더링
navigator.renderComponent();
