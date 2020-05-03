export type ViewType = 'MobileView' | 'DesktopView' | 'TabView';

export type RouteKeyType = {
  key: string;
  label: string;
  leftIcon?: string;
  children?: RouteKeyType[];
  withoutDashboard?: boolean;
};
