import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import Station from './components/station.js';
import Line from './components/line.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';
import Section from './components/section';
import Search from './components/search';
import Subway from './components/subway';
import Main from './components/main.js';
import { SELECTOR_ID, PATH, STATE_KEY, SELECTOR_CLASS } from './constants.js';
import router from './router/router.js';
import { state } from './store.js';
import LineModal from './components/lineModal';

// TODO: CSS 늦게 로드되는 거 고치기
// TODO: 항목 생성 시 애니메이션 추가
// 앱 상태 초기화
state.initState();

// 앱 컴포넌트 생성
const main = new Main(state, `#${SELECTOR_ID.GUIDE_WRAPPER}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const station = new Station(state, `#${SELECTOR_ID.STATION_LIST}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const line = new Line(state, `#${SELECTOR_ID.LINE_LIST}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const lineModal = new LineModal(state, `#${SELECTOR_ID.SUBWAY_LINE_FORM}`, `.${SELECTOR_CLASS.MODAL}`);
const section = new Section(
  state,
  `#${SELECTOR_ID.SUBWAY_LINE}`,
  `#${SELECTOR_ID.SECTION_LIST}`,
  `#${SELECTOR_ID.MAIN_CONTAINER}`
);
const search = new Search(state, '', `#${SELECTOR_ID.MAIN_CONTAINER}`);
const subway = new Subway(state, '', `#${SELECTOR_ID.MAIN_CONTAINER}`);
const login = new Login(`#${SELECTOR_ID.LOG_IN_FORM}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const signUp = new SignUp(`#${SELECTOR_ID.SIGN_UP_FORM}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const navigator = new Navigator(state, `#${SELECTOR_ID.NAVIGATOR}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);

// 라우팅 등록
router.register(PATH.STATIONS, station);
router.register(PATH.LINES, line);
router.register(PATH.LINES, lineModal);
router.register(PATH.SECTIONS, section);
// router.register(PATH.SECTIONS, sectionModal);
router.register(PATH.SEARCH, search);
router.register(PATH.SUBWAY, subway);
router.register(PATH.LOG_IN, login);
router.register(PATH.SIGN_UP, signUp);
router.register(PATH.ROOT, main);
router.initRouteEvent();

// 옵저버 등록
state.subscribe(STATE_KEY.IS_LOGGED_IN, navigator);
state.subscribe(STATE_KEY.STATION_LIST, station);
state.subscribe(STATE_KEY.LINE_LIST, line);
state.subscribe(STATE_KEY.TARGET_LINE_ID, lineModal);
state.subscribe(STATE_KEY.IS_ITEM_VIEW_MODE, lineModal);

// 네비게이터 렌더링
navigator.renderComponent();
