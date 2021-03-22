import { sectionsTemplate, modalTemplate } from './sectionsTemplate.js';
class Sections {
  constructor() {}

  init() {}

  getPageInfo() {
    return {
      title: '🚇 구간 관리',
      contents: {
        main: sectionsTemplate(),
        modal: modalTemplate(),
      },
    };
  }

  initDOM() {}
}

export default Sections;
