import subwayEmoji from '../../../images/subway_emoji.png';
import { MESSAGES } from '../../constants/constants';

export default `
  <div>
    <div class="d-flex justify-center">
      <img src="${subwayEmoji}" width="200" />
    </div>
    <p id="app-description" class="mt-0 text-center">
      ${MESSAGES.ENTRY_DESCRIPTION_LOGGED_IN}
    </p>
  </div>
`;
