import { $, $$ } from '../../@shared/utils/dom';
import { mainElements, modalElements } from '../views';
import { ROUTE } from './constants';

export const DOM = {
  APP: $('#app'),
  CONTAINER: {
    MENU: $('#menu-buttons-container'),
    SIGN: $('#sign-button-container'),
    MAIN: $('#main-container'),
    MODAL: $('#modal-container'),
  },
  ROOT: {
    MAIN: {
      MSG: $('#root-message-box', mainElements[ROUTE.ROOT]),
    },
  },
  USER_JOIN: {
    MAIN: {
      FORM: $('#signup-form', mainElements[ROUTE.SIGNUP]),
      EMAIL_INPUT: $('#signup-email', mainElements[ROUTE.SIGNUP]),
      PASSWORD_INPUT: $('#signup-password', mainElements[ROUTE.SIGNUP]),
      PASSWORD_CONFIRM_INPUT: $('#signup-password-confirm', mainElements[ROUTE.SIGNUP]),
      NAME_INPUT: $('#signup-name', mainElements[ROUTE.SIGNUP]),
      EMAIL_MSG: $('#email-message-box', mainElements[ROUTE.SIGNUP]),
      PASSWORD_MSG: $('#password-message-box', mainElements[ROUTE.SIGNUP]),
      PASSWORD_CONFIRM_MSG: $('#password-confirm-message-box', mainElements[ROUTE.SIGNUP]),
      NAME_MSG: $('#name-message-box', mainElements[ROUTE.SIGNUP]),
    },
  },
  USER_AUTH: {
    MAIN: {
      FORM: $('#signin-form', mainElements[ROUTE.SIGNIN]),
      EMAIL_INPUT: $('#signin-email', mainElements[ROUTE.SIGNIN]),
      PASSWORD_INPUT: $('#signin-password', mainElements[ROUTE.SIGNIN]),
      PASSWORD_MSG: $('#fail-message-box', mainElements[ROUTE.SIGNIN]),
    },
  },
  STATION: {
    MAIN: {
      FORM: $('#station-add-form', mainElements[ROUTE.STATIONS]),
      NAME_INPUT: $('#station-add-input', mainElements[ROUTE.STATIONS]),
      SUBMIT_BUTTON: $('#station-add-button', mainElements[ROUTE.STATIONS]),
      NAME_MSG: $('#add-fail-message-box', mainElements[ROUTE.STATIONS]),
      LIST: $('#station-list', mainElements[ROUTE.STATIONS]),
    },
    MODAL: {
      FORM: $('#station-modify-form', modalElements[ROUTE.STATIONS]),
      NAME_INPUT: $('#station-modify-input', modalElements[ROUTE.STATIONS]),
      SUBMIT_BUTTON: $('#station-modify-button', modalElements[ROUTE.STATIONS]),
      NAME_MSG: $('#modify-fail-message-box', modalElements[ROUTE.STATIONS]),
    },
  },
  LINE: {
    MAIN: {
      ADD_MODAL_BUTTON: $('#line-add-modal-button', mainElements[ROUTE.LINES]),
      LIST: $('#line-list', mainElements[ROUTE.LINES]),
    },
    MODAL: {
      FORM: $('#line-form', modalElements[ROUTE.LINES]),
      NAME_INPUT: $('#line-name-input', modalElements[ROUTE.LINES]),
      UP_STATION_SELECTOR: $('#up-station', modalElements[ROUTE.LINES]),
      DOWN_STATION_SELECTOR: $('#down-station', modalElements[ROUTE.LINES]),
      DISTANCE_INPUT: $('#distance', modalElements[ROUTE.LINES]),
      DURATION_INPUT: $('#duration', modalElements[ROUTE.LINES]),
      COLOR_INPUT: $('#line-color', modalElements[ROUTE.LINES]),
      PALETTE: $('#line-color-selector', modalElements[ROUTE.LINES]),
      SUBMIT_BUTTON: $('#line-submit-button', modalElements[ROUTE.LINES]),
      MSG: $('#fail-message-box', modalElements[ROUTE.LINES]),
      NON_MODIFIABLE: $$('.js-non-modifiable', modalElements[ROUTE.LINES]),
    },
  },
  SECTION: {
    MAIN: {
      ADD_MODAL_BUTTON: $('#section-add-modal-button', mainElements[ROUTE.SECTIONS]),
      LINE_COLOR_BAR: $('.section-hr', mainElements[ROUTE.SECTIONS]),
      LINE_SELECTOR: $('#main-line-selector', mainElements[ROUTE.SECTIONS]),
      LIST: $('#section-list', mainElements[ROUTE.SECTIONS]),
    },
    MODAL: {
      FORM: $('#section-form', modalElements[ROUTE.SECTIONS]),
      LINE_NAME: $('#modal-line-name', modalElements[ROUTE.SECTIONS]),
      UP_STATION_SELECTOR: $('#up-station', modalElements[ROUTE.SECTIONS]),
      DOWN_STATION_SELECTOR: $('#down-station', modalElements[ROUTE.SECTIONS]),
      DISTANCE_INPUT: $('#distance', modalElements[ROUTE.SECTIONS]),
      DURATION_INPUT: $('#duration', modalElements[ROUTE.SECTIONS]),
      SUBMIT_BUTTON: $('#section-submit-button', modalElements[ROUTE.SECTIONS]),
      MSG: $('#fail-message-box', modalElements[ROUTE.SECTIONS]),
      NON_MODIFIABLE: $('.js-non-modifiable', modalElements[ROUTE.SECTIONS]),
    },
  },
};
