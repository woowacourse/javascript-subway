const MODAL = {
  MAIN_CONTAINER: '.js-modal',
  CLOSE: '.modal-close',
};

const DATASET = {
  BG_COLOR: 'data-bg-color',
  LINE_ID: 'data-line-id',
};

const LINE = {
  CLASS: {
    SORT: '.js-line-item__sort',
    CREATE_ITEM: '.js-line-item__create',
    DETAIL_CONTAINER: '.js-line-detail-container',
    ITEM: '.js-line-item',
    ITEM_LIST: '.js-line-list',
    FORM_DETAIL: '.js-line-form__detail',
    COLOR_SELECTOR: '.js-subway-line-color-selector',
  },

  CLASSLIST: {
    EDIT_ITEM: 'js-line-item__edit',
    DELETE_ITEM: 'js-line-item__delete',
    COLOR_OPTION: 'color-option',
  },

  ID: {
    FORM: '#line-form',
    TITLE: '#line-title',
    NAME: '#subway-line-name',
    COLOR: '#subway-line-color',
    COLOR_PREVIEW: '#subway-line-color-preview',
  },
};

const MAP = {
  CLASS: {
    ALL_LINES_CONTAINER: '.js-all-lines-container',
    ALL_STATIONS: '.js-all-stations',
    SUBWAY_LINES_CONTAINER: '.subway-lines-container',
  },
};

const SECTION = {
  CLASS: {
    CREATE_ITEM: '.js-section-item__create',
    FORM_SELECT: '.js-section-form__select',
    ITEM: '.js-section-item',
    ITEM_LIST: '.js-section-list',
  },

  CLASSLIST: {
    DELETE_ITEM: 'js-section-item__delete',
  },

  ID: {
    CREATE_FORM: '#create-section-form',
  },
};

const STATION = {
  CLASS: {
    ITEM: '.js-station-item',
    ITEM_LIST: '.js-station-list',
  },

  CLASSLIST: {
    EDIT_ITEM: 'js-station-item__edit',
    DELETE_ITEM: 'js-station-item__delete',
  },

  ID: {
    CREATE_FORM: '#create-station-form',
    STATION_NAME: '#subway-station-name',
    EDIT_FORM: '#edit-station-form',
  },
};

const LOGIN = {
  CLASS: {
    CHECK: '.js-login-check',
  },

  ID: {
    FORM: '#login-form',
  },
};

const SIGNUP = {
  ID: {
    FORM: '#signup-form',
  },
};

export { MODAL, LINE, MAP, LOGIN, SIGNUP, SECTION, STATION, DATASET };
