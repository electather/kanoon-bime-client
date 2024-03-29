import {
  CarFilled,
  HomeFilled,
  IdcardFilled,
  MailFilled,
} from '@ant-design/icons';
import { translations } from 'locales/i18n';
import { RouteKeyType } from 'types/data';

import { BIIPage } from '../BIIPage/Loadable';
import { HomePage } from '../HomePage/Loadable';
import { TPIPage } from '../TPIPage/Loadable';
import { UsersPage } from '../Users/Loadable';
import { VehiclePage } from '../VehiclePage/Loadable';

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
  {
    key: 'bii',
    label: translations.pages.bodyInsurance.title(),
    Icon: MailFilled,
    component: BIIPage,
  },
  {
    key: 'vehicle',
    label: translations.pages.vehicle.title(),
    Icon: CarFilled,
    component: VehiclePage,
  },
  {
    key: 'users',
    label: translations.pages.users.title(),
    Icon: IdcardFilled,
    component: UsersPage,
  },
];
