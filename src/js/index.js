import '../css/index.css';
import { $ } from './@shared/utils/index';
import { stateManager } from './@shared/models/StateManager';
import { Subway } from './subway';
import { STATE_KEY } from './subway/constants/constants';

class App {
  constructor() {
    this.selectDOM();
    this.bindEvents();
    this.mountChildComponents();
  }

  selectDOM() {
    this.$app = $('#app');
  }

  mountChildComponents() {
    this.subway = new Subway();
  }

  bindEvents() {
    // issue: 이벤트 위임을 했을 때, a 태그가 아닌 내부의 태그를 타겟팅하고 있어 적절한 얼리 리턴이 어려움.
    // solve: 하나의 태그를 감싸는 모든 a 태그에 대한 이벤트 위임 목적으로 상대 참조 및 tagName 비교.
    // 실제 anchor 역할을 갖는 태그를 분리할 경우: 'js-anchor' 부여한 태그에 대한 얼리 리턴으로 이슈 대응.
    this.$app.addEventListener('click', event => {
      if (!event.target.parentNode.tagName === 'a') return;
      event.preventDefault();
      const path = event.target.parentNode.getAttribute('href');

      history.pushState({ path }, null, path);
      stateManager[STATE_KEY.ROUTE].set(path);
    });
  }
}

window.addEventListener('popstate', event => {
  const path = event.state.path;

  stateManager[STATE_KEY.ROUTE].set(path);
});

window.addEventListener('load', () => {
  const app = new App();
  const path = location.pathname;

  stateManager[STATE_KEY.ROUTE].set(path);
});
