import { ViewType } from 'types/data';

export type Directions = 'rtl' | 'ltr';

export interface SettingsState {
  readonly direction: Directions;
  readonly collapsed: boolean;
  readonly view: ViewType;
  readonly height: number;
  readonly openDrawer: boolean;
  readonly openKeys: string[];
  readonly current: string[];
}
