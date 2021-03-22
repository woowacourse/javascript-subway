import { PAGE_TITLE } from '../../constants.js';
import { sectionsTemplate, modalTemplate } from './sectionsTemplate.js';
class Sections {
  constructor() {}

  init() {}

  getPageInfo() {
    return {
      title: PAGE_TITLE.SECTIONS,
      contents: {
        main: sectionsTemplate(),
        modal: modalTemplate(),
      },
    };
  }

  initDOM() {}
}

export default Sections;
