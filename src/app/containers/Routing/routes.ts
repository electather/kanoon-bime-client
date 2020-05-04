import { HomeFilled, MailFilled } from '@ant-design/icons';
import { translations } from 'locales/i18n';
import { RouteKeyType } from 'types/data';

export enum PublicRoutes {
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot',
}

export enum PrivateRoutes {
  DASHBOARD = '/dashboard',
}

export const options: RouteKeyType[] = [
  {
    key: '',
    label: translations.pages.homePage(),
    Icon: HomeFilled,
  },
  {
    key: 'mail',
    label: translations.pages.mailPage(),
    Icon: MailFilled,
  },
];
