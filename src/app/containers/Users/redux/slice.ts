import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { CreateUser } from 'userRequest';
import { ErrorResponse, UserData, UsersPage } from 'userResponse';

import { QuerySchema, UsersState } from './types';

export const initialState: UsersState = {
  loading: false,
};

const tpiSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchList(state, action: PayloadAction<QuerySchema>) {
      state.loading = true;
      state.error = undefined;
      state.filterData = action.payload;
    },
    fetchDone(state, action: PayloadAction<UsersPage>) {
      state.loading = false;
      state.error = undefined;
      state.list = action.payload.data;
      state.paginationData = action.payload.meta;
    },
    create(state, action: PayloadAction<CreateUser>) {
      state.loading = true;
      state.selectedUser = undefined;
      state.error = undefined;
    },
    createDone(state, action: PayloadAction<UserData>) {
      state.loading = false;
      state.error = undefined;
      state.selectedUser = action.payload;
    },
    fetchById(state, action: PayloadAction<string>) {
      state.loading = true;
      state.selectedUser = undefined;
      state.error = undefined;
    },
    fetchByIdDone(state, action: PayloadAction<UserData>) {
      state.loading = false;
      state.error = undefined;
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = undefined;
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

export const selectListState = createSelector(
  [selectUsersState],
  ({ list, paginationData, loading }) => ({ list, paginationData, loading }),
);

export const selectDrawerData = createSelector(
  [selectUsersState],
  ({ selectedUser }) => selectedUser,
);

export const selectFormData = createSelector(
  [selectUsersState],
  ({ loading, selectedUser }) => ({ loading, selectedUser }),
);

export const { actions, reducer, name: sliceKey } = tpiSlice;
