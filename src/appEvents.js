import delegateNavigatorClickEvent from './delegators/navigator.js';

import delegateLoginSubmitEvent from './delegators/login.js';
import delegateSignUpSubmitEvent from './delegators/signup.js';
import {
  delegateStationSubmitEvent,
  delegateStationFocusOutEvent,
  delegateStationClickEvent,
} from './delegators/station.js';

const delegateEvents = () => {
  document.body.addEventListener('click', handleClickEvents);
  document.body.addEventListener('submit', handleSubmitEvents);
  document.body.addEventListener('focusout', handleFocusOutEvent);
};

function handleClickEvents(event) {
  delegateNavigatorClickEvent(event);
  delegateStationClickEvent(event);
}

function handleSubmitEvents(event) {
  event.preventDefault();
  delegateLoginSubmitEvent(event);
  delegateSignUpSubmitEvent(event);
  delegateStationSubmitEvent(event);
}

function handleFocusOutEvent(event) {
  delegateStationFocusOutEvent(event);
}

export default delegateEvents;
