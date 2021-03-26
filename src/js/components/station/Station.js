import { PAGE_TITLE } from '../../constants.js';
import { stationTemplate } from './stationTemplate.js';

class Station {
  constructor() {}

  init() {
    // TODO (2단계)
    // fetch 지하철 역 목록 조회
  }

  getPageInfo() {
    return {
      title: PAGE_TITLE.STATIONS,
      contents: {
        main: stationTemplate(),
      },
    };
  }

  initDOM() {
    // TODO (2단계)
    // 1. 역 이름 추가 관련 이벤트 등록 <form>
    // 2. 역 수정/삭제 관련 이벤트 등록(위임) <ul>
    // => 역 추가, 역 수정, 역 삭제
  }
}

export default Station;
