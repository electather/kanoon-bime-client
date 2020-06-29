import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { CreateBodyInsurance } from 'userRequest';
import { BodyInsuranceResponse, ErrorResponse, Paginated } from 'userResponse';

import { BodyInsuranceState, QuerySchema } from './types';

export const initialState: BodyInsuranceState = {
  loading: false,
};

const tpiSlice = createSlice({
  name: 'bodyInsurance',
  initialState,
  reducers: {
    fetchList(state, action: PayloadAction<QuerySchema>) {
      state.loading = true;
      state.error = undefined;
      state.filterData = action.payload;
    },
    fetchDone(state, action: PayloadAction<Paginated<BodyInsuranceResponse>>) {
      state.loading = false;
      state.error = undefined;
      state.list = action.payload.data;
      state.paginationData = action.payload.meta;
    },
    create(
      state,
      action: PayloadAction<{ data: CreateBodyInsurance; clearFn: () => void }>,
    ) {
      state.loading = true;
      state.selectedInsurance = undefined;
      state.error = undefined;
    },
    createDone(state, action: PayloadAction<BodyInsuranceResponse>) {
      state.loading = false;
      state.error = undefined;
      state.selectedInsurance = action.payload;
    },
    fetchById(state, action: PayloadAction<string>) {
      state.loading = true;
      state.selectedInsurance = undefined;
      state.error = undefined;
    },
    fetchByIdDone(state, action: PayloadAction<BodyInsuranceResponse>) {
      state.loading = false;
      state.error = undefined;
      state.selectedInsurance = action.payload;
    },
    clearSelectedInsurance(state) {
      state.selectedInsurance = undefined;
    },
    requestFailed(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectTPIState = createSelector(
  [(state: RootState) => state.bodyInsurance || initialState],
  bodyInsurance => bodyInsurance,
);

export const selectListState = createSelector(
  [selectTPIState],
  ({ list, paginationData, loading }) => ({ list, paginationData, loading }),
);

export const selectDrawerData = createSelector(
  [selectTPIState],
  ({ selectedInsurance }) => selectedInsurance,
);

export const selectFormData = createSelector(
  [selectTPIState],
  ({ loading, error }) => ({ loading, error }),
);

export const { actions, reducer, name: sliceKey } = tpiSlice;
