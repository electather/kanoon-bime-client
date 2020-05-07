import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { UserData } from 'userResponse';

import { AuthState, ErrorType, LoginPayload } from './types';
import { clearToken, getToken } from './utils';

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
    authFailure(state, action: PayloadAction<ErrorType>) {
      state.authState = 'unAuthenticated';
      state.error = action.payload;
      state.user = undefined;
    },
    login(state, action: PayloadAction<LoginPayload>) {
      state.authState = 'fetchingInfo';
    },
    authSuccess(state, action: PayloadAction<UserData>) {
      state.authState = 'loggedIn';
      state.user = action.payload;
    },
    logout(state) {
      clearToken();
      state.authState = 'unAuthenticated';
    },
  },
});

export const selectAuthState = createSelector(
  [(state: RootState) => state.auth || initialState],
  settings => settings.authState,
);

export const selectLoggedInUser = createSelector(
  [(state: RootState) => state.auth || initialState],
  settings => settings.user,
);

export const selectAuthError = createSelector(
  [(state: RootState) => state.auth || initialState],
  settings => settings.error,
);

export const { actions, reducer, name: sliceKey } = authSlice;
