export type TPIListSchema = { id: string }[];

export type NewTPISchema = {
  username: string;
  password: string;
};

export type PaginationData = {
  username: string;
  password: string;
};

export type QuerySchema = {
  username: string;
  password: string;
};

export enum ErrorType {
  RESPONSE_ERROR = 'undefined',
  USER_NOT_FOUND = 'notFound',
  USER_NOT_AUTHORIZED = 'wrongUsernameOrPassword',
}

export interface TPIState {
  readonly list?: TPIListSchema;
  readonly paginationData?: PaginationData;
  readonly filterData?: QuerySchema;
  readonly error?: ErrorType;
  readonly loading: boolean;
}
