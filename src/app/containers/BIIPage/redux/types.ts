import { BodyInsuranceResponse, ErrorResponse, PageMeta } from 'userResponse';

export type QuerySchema = {
  bimeNumber?: string;
  page: number;
  take?: number;
  order?: 'ASC' | 'DESC';
};

export interface BodyInsuranceState {
  readonly list?: BodyInsuranceResponse[];
  readonly selectedInsurance?: BodyInsuranceResponse;
  readonly paginationData?: PageMeta;
  readonly filterData?: QuerySchema;
  readonly error?: ErrorResponse;
  readonly loading: boolean;
}
