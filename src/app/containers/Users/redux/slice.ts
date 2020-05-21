import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { QuerySchema, TPIState } from './types';

export const initialState: TPIState = {
  loading: true,
};

const tpiSlice = createSlice({
  name: 'tpi',
  initialState,
  reducers: {
    fetchTPIList(state, action: PayloadAction<QuerySchema>) {
      state.loading = true;
      state.error = undefined;
      state.filterData = action.payload;
    },
    fetchTPIDone(state) {},
    fetchTPIFailed(state) {},
    createNewTPI(state) {},
    createNewTPIDone(state) {},
    createNewTPIFailed(state) {},
    fetchOneTPI(state) {},
    fetchOneTPIDone(state) {},
    fetchOneTPIFailed(state) {},
  },
});

export const selectTPIState = createSelector(
  [(state: RootState) => state.tpi || initialState],
  tpi => tpi,
);

export const { actions, reducer, name: sliceKey } = tpiSlice;
