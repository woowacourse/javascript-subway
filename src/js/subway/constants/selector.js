export const SELECTOR = {
  CONTAINER: {
    MENU_BUTTON: 'menu-buttons-container',
    SIGN_BUTTON: 'sign-button-container',
    MAIN: 'main-container',
    MODAL: 'modal-container',
  },
  CONTENT: {
    MAIN: 'main-content',
    MODAL: 'modal-content',
  },
  ROOT: {
    MAIN: {
      MSG: 'root-message-box',
    },
  },
  USER_JOIN: {
    MAIN: {
      FORM: 'signup-form',
      EMAIL_INPUT: 'signup-email',
      PASSWORD_INPUT: 'signup-password',
      PASSWORD_CONFIRM_INPUT: 'signup-password-confirm',
      NAME_INPUT: 'signup-name',
      EMAIL_MSG: 'email-message-box',
      PASSWORD_MSG: 'password-message-box',
      PASSWORD_CONFIRM_MSG: 'password-confirm-message-box',
      NAME_MSG: 'name-message-box',
    },
  },
  USER_AUTH: {
    MAIN: {
      FORM: 'signin-form',
      EMAIL_INPUT: 'signin-email',
      PASSWORD_INPUT: 'signin-password',
      PASSWORD_MSG: 'fail-message-box',
    },
  },
  STATION: {
    MAIN: {
      FORM: 'station-add-form',
      NAME_INPUT: 'station-add-input',
      SUBMIT_BUTTON: 'station-add-button',
      NAME_MSG: 'add-fail-message-box',
      LIST: 'station-list',
    },
    MODAL: {
      FORM: 'station-modify-form',
      NAME_INPUT: 'station-modify-input',
      SUBMIT_BUTTON: 'station-modify-button',
      NAME_MSG: 'modify-fail-message-box',
    },
  },
  LINE: {
    MAIN: {
      ADD_MODAL_BUTTON: 'line-add-modal-button',
      LIST: 'line-list',
    },
    MODAL: {
      FORM: 'line-form',
      NAME_INPUT: 'line-name-input',
      UP_STATION_SELECTOR: 'up-station',
      DOWN_STATION_SELECTOR: 'down-station',
      DISTANCE_INPUT: 'distance',
      DURATION_INPUT: 'duration',
      COLOR_INPUT: 'line-color',
      PALETTE: 'line-color-selector',
      SUBMIT_BUTTON: 'line-submit-button',
      MSG: 'fail-message-box',
      NON_MODIFIABLE: 'js-non-modifiable',
    },
  },
  SECTION: {
    MAIN: {
      ADD_MODAL_BUTTON: 'section-add-modal-button',
      LINE_SELECTOR: 'main-line-selector',
      LIST: 'section-list',
    },
    MODAL: {
      FORM: 'section-form',
      LINE_NAME: 'modal-line-name',
      UP_STATION_SELECTOR: 'up-station',
      DOWN_STATION_SELECTOR: 'down-station',
      DISTANCE_INPUT: 'distance',
      DURATION_INPUT: 'duration',
      SUBMIT_BUTTON: 'section-submit-button',
      MSG: 'fail-message-box',
      NON_MODIFIABLE: 'js-non-modifiable',
    },
  },
  MAP: {
    MAIN: {
      TOTAL_LINE_LIST: 'total-line-list',
    },
  },
};
