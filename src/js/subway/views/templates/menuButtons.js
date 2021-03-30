import { linkButton } from '../../../@shared/views/templates/linkButton';
import { MENU, ROUTE } from '../../constants/constants';

const navButtonInfos = [
  { link: ROUTE.STATIONS, text: MENU.STATIONS },
  { link: ROUTE.LINES, text: MENU.LINES },
  { link: ROUTE.SECTIONS, text: MENU.SECTIONS },
];

export const menuButtons = navButtonInfos.map(linkButton).join('');
