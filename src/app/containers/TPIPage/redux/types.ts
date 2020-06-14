import { ErrorResponse, PageMeta, TPIResponse } from 'userResponse';

export type PaginationData = {
  username: string;
  password: string;
};

export type QuerySchema = {
  bimeNumber?: string;
  page: number;
  take?: number;
};

export interface TPIState {
  readonly list?: TPIResponse[];
  readonly selectedTpi?: TPIResponse;
  readonly paginationData?: PageMeta;
  readonly filterData?: QuerySchema;
  readonly error?: ErrorResponse;
  readonly loading: boolean;
}
