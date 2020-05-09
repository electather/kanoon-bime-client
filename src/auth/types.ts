import { UserData } from 'userResponse';

export type UserState =
  | 'loggedIn'
  | 'fetchingInfo'
  | 'locked'
  | 'unAuthenticated';

export type LoginPayload = {
  username: string;
  password: string;
};

export enum ErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  USER_NOT_AUTHORIZED = 3,
}

export interface AuthState {
  readonly authState: UserState;
  readonly user?: UserData;
  readonly error?: ErrorType;
}
