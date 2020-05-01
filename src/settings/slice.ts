import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { Directions, SettingsState } from './types';

export const initialState: SettingsState = {
  direction: 'rtl',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeDirection(state, action: PayloadAction<Directions>) {
      state.direction = action.payload;
    },
  },
});

export const selectDirection = createSelector(
  [(state: RootState) => state.settings || initialState],
  settings => settings.direction,
);
export const { changeDirection } = settingsSlice.actions;
export const reducer = settingsSlice.reducer;
export const settingsSliceKey = settingsSlice.name;
