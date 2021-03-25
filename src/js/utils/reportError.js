import { showSnackbar } from './notify.js';

const logError = (message) => {
  // eslint-disable-next-line no-console
  console.error(message);
};

const reportError = ({ messageToUser, messageToLog }, showError = showSnackbar) => {
  showError(messageToUser);
  logError(messageToLog);
};

export default reportError;
