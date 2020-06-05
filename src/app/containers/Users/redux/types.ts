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
  melliCode?: string;
  page: number;
  take?: number;
};

export interface UsersState {
  readonly list?: UserDataMinimal[];
  readonly selectedUser?: UserData;
  readonly paginationData?: PageMeta;
  readonly filterData?: QuerySchema;
  readonly error?: ErrorResponse;
  readonly loading: boolean;
}
