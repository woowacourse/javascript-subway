import delegateNavigatorClickEvent from './delegators/navigator.js';

import delegateLoginSubmitEvent from './delegators/login.js';
import delegateSignUpSubmitEvent from './delegators/signup.js';
import delegateStationSubmitEvent from './delegators/station.js';

const delegateEvents = () => {
  document.body.addEventListener('click', handleClickEvents);
  document.body.addEventListener('submit', handleSubmitEvents);
};

function handleClickEvents(event) {
  delegateNavigatorClickEvent(event);
}

function handleSubmitEvents(event) {
  event.preventDefault();
  delegateLoginSubmitEvent(event);
  delegateSignUpSubmitEvent(event);
  delegateStationSubmitEvent(event);
}

export default delegateEvents;
