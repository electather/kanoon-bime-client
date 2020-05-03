import { HomeOutlined, MailOutlined } from '@ant-design/icons';
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
    label: 'Home',
    Icon: HomeOutlined,
  },
  {
    key: 'mail',
    label: 'MAIL',
    Icon: MailOutlined,
  },
];
