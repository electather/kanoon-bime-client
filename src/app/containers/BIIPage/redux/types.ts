import {
  ErrorResponse,
  PageMeta,
  UserData,
  UserDataMinimal,
} from 'userResponse';

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
  readonly list?: UserDataMinimal[];
  readonly selectedTpi?: UserData;
  readonly paginationData?: PageMeta;
  readonly filterData?: QuerySchema;
  readonly error?: ErrorResponse;
  readonly loading: boolean;
}
