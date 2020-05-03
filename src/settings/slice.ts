import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { getView, isServer } from 'utils';

import { Directions, SettingsState } from './types';

export const initialState: SettingsState = {
  direction: 'rtl',
  collapsed: !isServer && window.innerWidth > 1220 ? false : true,
  height: !isServer ? window.innerHeight : 0,
  view: !isServer ? getView(window.innerWidth) : 'DesktopView',
  openDrawer: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeDirection(state, action: PayloadAction<Directions>) {
      state.direction = action.payload;
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    toggleAll(
      state,
      { payload }: PayloadAction<{ width: number; height: number }>,
    ) {
      const view = getView(payload.width);
      const collapsed = view !== 'DesktopView';
      if (state.view !== view || payload.height !== state.height) {
        const height = payload.height ? payload.height : state.height;
        state.collapsed = collapsed;
        state.view = view;
        state.height = height;
      }
    },
    toggleOpenDrawer(state) {
      state.openDrawer = !state.openDrawer;
    },
  },
});

export const selectDirection = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.direction,
);

export const selectCollapsed = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.collapsed,
);

export const selectHeight = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.height,
);

export const selectView = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.view,
);

export const selectOpenDrawer = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.openDrawer,
);

export const { actions, reducer, name: sliceKey } = settingsSlice;
