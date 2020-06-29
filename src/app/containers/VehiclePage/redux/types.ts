import { ErrorResponse, PageMeta, VehicleResponse } from 'userResponse';

export type PaginationData = {
  username: string;
  password: string;
};

export type QuerySchema = {
  page?: number;
  take?: number;
  engineNumber?: string;
  chassisNumber?: string;
  order?: 'ASC' | 'DESC';
};

export interface VehicleState {
  readonly list?: VehicleResponse[];
  readonly selectedVehicle?: VehicleResponse;
  readonly paginationData?: PageMeta;
  readonly filterData?: QuerySchema;
  readonly error?: ErrorResponse;
  readonly loading: boolean;
}
