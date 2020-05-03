import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { AuthState, ErrorType, UserData } from './types';
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
    fetchUserDataSuccess(state, action: PayloadAction<UserData>) {
      state.authState = 'loggedIn';
      state.user = action.payload;
    },
    fetchUserDataFailure(state, action: PayloadAction<ErrorType>) {
      state.authState = 'unAuthenticated';
      state.error = action.payload;
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

export const { actions, reducer, name: sliceKey } = authSlice;
