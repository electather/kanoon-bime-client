import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { ErrorResponse, UserData, UserDataMinimal } from 'userResponse';

import { HomePageState, QuerySchema } from './types';

export const initialState: HomePageState = {
  loading: false,
};

const tpiSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    fetchStats(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchStatsDone(state, action: PayloadAction<UserDataMinimal>) {
      state.loading = false;
      state.error = undefined;
      state.stats = action.payload;
    },
    fetchExpiryList(state, action: PayloadAction<QuerySchema>) {
      state.loading = true;
      state.expireList = undefined;
      state.error = undefined;
    },
    fetchExpiryListDone(state, action: PayloadAction<UserData>) {
      state.loading = false;
      state.error = undefined;
      state.expireList = action.payload;
    },
    requestFailed(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectUsersState = createSelector(
  [(state: RootState) => state.users || initialState],
  users => users,
);

export const { actions, reducer, name: sliceKey } = tpiSlice;
