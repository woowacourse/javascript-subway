import { PAGE_TITLE } from '../../constants.js';
import { sectionsTemplate, modalTemplate } from './sectionTemplate.js';
class Section {
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

export default Section;
