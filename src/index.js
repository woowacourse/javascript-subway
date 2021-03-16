import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import { SELECTOR_ID } from './constants';
import State from './lib/State.js';
import Router from './router/Router';

// 앱 상태 초기화
const state = new State();

// 라우터 생성
const router = new Router();

// 라우팅 등록
router.initRouteEvent();

// 네이게이션 컴포넌트 초기화
const navigator = new Navigator(`#${SELECTOR_ID.NAVIGATOR}`);

// 앱 렌더링
navigator.render();
navigator.initPushStateEvent(router.navigate);
