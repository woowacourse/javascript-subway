import { stateManager } from '../../@shared/models/StateManager.js';
import { root } from './templates/root.js';
import { signIn } from './templates/signIn.js';
import { signUp } from './templates/signUp.js';
import { stationManage } from './templates/stationManage.js';
import { lineManage } from './templates/lineManage.js';
import { sectionManage } from './templates/sectionManage.js';
export { menuButtons } from './templates/menuButtons.js';
export { lineAddModal } from './templates/lineAddModal.js';
export { sectionAddModal } from './templates/sectionAddModal.js';
// export {} from './templates/mapDisplay.js';
// export {} from './templates/pathFind.js';

export const mainTemplate = {
  '': root(stateManager['isSigned'].get()),
  signin: signIn,
  signup: signUp,
  stations: stationManage,
  lines: lineManage,
  sections: sectionManage,
  //   map: mapDisplay
  //   search:pathFind
};
