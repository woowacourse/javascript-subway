import { root } from './templates/root';
import { signIn } from './templates/signIn';
import { signUp } from './templates/signUp';
import { ROUTE } from '../constants/constants';
import { parseToElements } from '../../@shared/utils/dom';
import { $ } from '../../@shared/utils';

export { menuButtons } from './templates/menuButtons';
export { lineAddModal } from './templates/lineAddModal';
export { sectionAddModal } from './templates/sectionAddModal';

export const contentElements = {
  [ROUTE.ROOT]: $('#content', parseToElements(root)),
  [ROUTE.SIGNIN]: $('#content', parseToElements(signIn)),
  [ROUTE.SIGNUP]: $('#content', parseToElements(signUp)),
};
