import { HomeFilled, MailFilled } from '@ant-design/icons';
import { translations } from 'locales/i18n';
import { RouteKeyType } from 'types/data';

import { HomePage } from '../HomePage/Loadable';
import { TPIPage } from '../TPIPage/Loadable';

export enum PublicRoutes {
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot',
}

export enum PrivateRoutes {
  DASHBOARD = '/dashboard',
}

export const privateRoutes: RouteKeyType[] = [
  {
    key: '',
    label: translations.pages.homePage.title(),
    Icon: HomeFilled,
    component: HomePage,
  },
  {
    key: 'tpi',
    label: translations.pages.thirdPartyInsurance.title(),
    Icon: MailFilled,
    component: TPIPage,
  },
];
