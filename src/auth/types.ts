export type UserState =
  | 'loggedIn'
  | 'fetchingInfo'
  | 'locked'
  | 'unAuthenticated';

export type LoginPayload = {
  username: string;
  password: string;
};

export type UserData = {
  id: string;
  name: string;
};

export enum ErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
}

export interface AuthState {
  readonly authState: UserState;
  readonly user?: UserData;
  readonly error?: ErrorType;
}
