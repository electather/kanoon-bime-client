import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { AuthState } from './types';
import { getToken } from './utils';

export const initialState: AuthState = {
  authState: getToken() ? 'fetchingInfo' : 'unAuthenticated',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUserData(state) {
      state.authState = 'fetchingInfo';
    },
    fetchUserDataSuccess(state) {
      state.authState = 'loggedIn';
    },
    fetchUserDataFailure(state) {
      state.authState = 'unAuthenticated';
    },
  },
});

export const selectAuthState = createSelector(
  [(state: RootState) => state.auth || initialState],
  settings => settings.authState,
);

export const {
  fetchUserData,
  fetchUserDataSuccess,
  fetchUserDataFailure,
} = authSlice.actions;
export const reducer = authSlice.reducer;
export const settingsSliceKey = authSlice.name;
