import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { CreateVehicle } from 'userRequest';
import { ErrorResponse, Paginated, VehicleResponse } from 'userResponse';

import { QuerySchema, VehicleState } from './types';

export const initialState: VehicleState = {
  loading: true,
};

const tpiSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    fetchList(state, action: PayloadAction<QuerySchema>) {
      state.loading = true;
      state.error = undefined;
      state.filterData = action.payload;
    },
    fetchDone(state, action: PayloadAction<Paginated<VehicleResponse>>) {
      state.loading = false;
      state.error = undefined;
      state.list = action.payload.data;
      state.paginationData = action.payload.meta;
    },
    create(
      state,
      action: PayloadAction<{ data: CreateVehicle; clearFn: () => void }>,
    ) {
      state.loading = true;
      state.selectedVehicle = undefined;
      state.error = undefined;
    },
    createDone(state, action: PayloadAction<VehicleResponse>) {
      state.loading = false;
      state.error = undefined;
      state.selectedVehicle = action.payload;
    },
    fetchById(state, action: PayloadAction<string>) {
      state.loading = true;
      state.selectedVehicle = undefined;
      state.error = undefined;
    },
    fetchByIdDone(state, action: PayloadAction<VehicleResponse>) {
      state.loading = false;
      state.error = undefined;
      state.selectedVehicle = action.payload;
    },
    clearSelectedVehicle(state) {
      state.selectedVehicle = undefined;
    },
    requestFailed(state, action: PayloadAction<ErrorResponse>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectVehicleState = createSelector(
  [(state: RootState) => state.vehicles || initialState],
  vehicles => vehicles,
);

export const selectListState = createSelector(
  [selectVehicleState],
  ({ list, paginationData, loading }) => ({ list, paginationData, loading }),
);

export const selectDrawerData = createSelector(
  [selectVehicleState],
  ({ selectedVehicle: selectedUser }) => selectedUser,
);

export const selectFormData = createSelector(
  [selectVehicleState],
  ({ loading, selectedVehicle: selectedUser }) => ({ loading, selectedUser }),
);

export const { actions, reducer, name: sliceKey } = tpiSlice;
